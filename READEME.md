# 幽钥的网站sso-server搭建笔记和记录

### **koa-generator生成koa2项目**

`npm install -g koa-generator`

`koa2 [项目名|空]` 生成项目

**

### **token校验**

安装koa-jwt

用于验证 JSON Web 令牌的 Koa 中间件。

`npm install koa-jwt --save`

**

### **koa-body解析配置**

安装koa-body便于解析multipart格式

`npm install koa-body --save`

**

### **session配置**

安装koa-session

`npm install koa-session --save`

**

### **初始化响应请求和错误日志目录**

安装log4js

查看响应和请求的状态用于程序分析，便于debug

`npm install log4js --save`

**

### **初始化文件上传目录和用户头像上传目录**

**

**设置中间件**

1. 配置logger.js中间件用于记录用户响应请求和错误日志
2. 配置token.js中间件用于token校验
3. 配置gatherToken.js中间件用于收集请求中的用户token参数
4. 配置authToken.js用于token校验失败时动作
5. 配置formatter.js中间件用于处理api请求并格式化返回请求
6. 配置params.js中间件用于收集get|post请求参数
7. 配置verifyParams.js中间件用于校验用户请求参数

**

### **配置sequelize-automate **

*是一个根据表结构自动创建 models 的工具*

安装sequelize-automate

`npm install sequelize-automate --save`

`npm install sequelize-automate --g`

安装好后可使用命令行同步配置

`./node_modules/.bin/sequelize-automate -t js -h localhost -d database -u username -p password -P 3306 -e mysql -o models`

或指定配置文件

支持json，创建sequelize-automate.config.json

```json
{
  "dbOptions": {
    "database": "test",
    "username": "root",
    "password": "root",
    "dialect": "mysql",
    "host": "localhost",
    "port": 3306,
    "logging": false
  },
  "options": {
    "type": "js",
    "dir": "models"
  }
}
```

支持js文件sequelize-automate.config.js

```
module.exports = {
  dbOptions: {
    database: "test",
    username: "root",
    password: "root",
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    logging: false
  },
  options: {
    type: "js",
    dir: "models"
 }
}
```

在package.json script中配置

`"sequelize-automate": "sequelize-automate -c ./sequelize-automate.config.js"`

**<u>sequelize-automate在项目中不再使用</u>**

<u>数据库中已存在数据表，使用sequelize-automate将数据表转化为模型然后就可以在项目中使用了，这样很方便,  但是我更想尝试一下使用sequelize-cli来操作数据库</u>

<u>在后续的项目构建中，sequelize-automate将数据库表转化为模型文件，可以参考此模型文件中关于表属性的配置项，在迁移文件中直接使用这个属性配置项并执行迁移会提示配置项错误，删除错误的属性配置，即可正常</u>



### **sequelize & sequelize-cli**

orm工具

`npm install sequelize --save`

`npm install sequelize-cli --save-dev`

#### 初始化文件目录

`npx sequelize-cli init`

初始化sequelize项目，该命令将创建如下目录：        

- config：包含配置文件，它告诉CLI如何连接数据库        

- models：包含您的项目的所有模型       

 - migrations：包含所有迁移文件（数据表结构）

 - seeders：包含所有种子文件（具体数据）

#### 配置数据库信息

打开config下的config.json，修改对应项配置

由于项目中使用.env文件配置各项信息，将config.json，改为config.js， 获取环境变量中的配置信息，并输出新的配置

#### 创建和删除数据库

`npx sequelize-cli db:create`

`npx sequelize-cli db:drop`

#### 创建模型文件

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

(不清楚怎么对每一项进行详细的配置，比如不为空、唯一这些属性，简单创建一个然后去修改模型文件）

会生成一个模型文件和一个迁移文件XXXXXXXXXXXXXX-create-user.js, 需要保持这两个文件的配置同步

#### 运行迁移

在这一步之前，还没有向数据库中插入任何内容。要在数据库中实际创建该表，需要运行`db:migrate`命令。

`npx sequelize-cli db:migrate`

此命令将执行以下步骤：

- 将确保`SequelizeMeta`在数据库中调用一个表。此表用于记录在当前数据库上运行了哪些迁移
- 开始寻找尚未运行的任何迁移文件。这可以通过检查`SequelizeMeta`表来实现。在这种情况下，它将运行`XXXXXXXXXXXXXX-create-user.js`我们在上一步中创建的迁移。
- 创建一个`Users`使用其迁移文件中指定的所有列调用的表。

#### 撤消迁移

使用`db:migrate:undo`，此命令将恢复最近的迁移。

```text
npx sequelize-cli db:migrate:undo
```

使用`db:migrate:undo:all`命令撤消所有迁移来恢复到初始状态。通过在`--to`选项中传递其名称来恢复到特定迁移。

```text
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

如果迁移文件执行过，那么将会在SequelizeMeta表中留下记录，下次执行迁移时就不会执行了。有时候会测试编写的文件能否正常执行，也会在表中留下记录，删除记录可以再次执行

#### 迁移骨架

官网讲的的场景有很多，比如有创建表、添加表项、删除表项等等。这一块的详细文档我还没有找到

createTable

dropTable

addColumn(表名,表属性,表属性配置)

removeColumn(表名,表属性,表属性配置)

changeColumn(表名,表属性,表属性配置)

以下是在数据库中执行两次更改的迁移示例，使用自动管理的**事务**来确保所有指令成功执行或在失败时回滚：

```
module.exports = {

  up: (queryInterface, Sequelize) => {

​    return queryInterface.sequelize.transaction(t => {

​      return Promise.all([

​        queryInterface.addColumn('Person', 'petName', {

​          type: Sequelize.DataTypes.STRING

​        }, { transaction: t }),

​        queryInterface.addColumn('Person', 'favoriteColor', {

​          type: Sequelize.DataTypes.STRING,

​        }, { transaction: t })

​      ]);

​    });

  },

  down: (queryInterface, Sequelize) => {

​    return queryInterface.sequelize.transaction(t => {

​      return Promise.all([

​        queryInterface.removeColumn('Person', 'petName', { transaction: t }),

​        queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })

​      ]);

​    });

  }

};
```

