require('dotenv').config({ path: '.env' }); // 版本不一样config方式不一样
const {
    DB_HOST, // 数据库地址
    DB_PORT, // 数据库端口
    DB_NAME, // 数据库名称
    DB_USERNAME, // 目标数据库用户名
    DB_PASSWORD, // 目标数据库密码
} = process.env;
module.exports = {
    dbOptions: {
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        dialect: "mysql",
        host: DB_HOST,
        port: DB_PORT,
        logging: false
    },
    options: {
        type: "js",
        dir: "models",
        camel: true
    }
}