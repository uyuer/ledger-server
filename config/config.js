require('dotenv').config({ path: '.env' });
const {
    DB_HOST, // 数据库地址
    DB_PORT, // 数据库端口
    DB_NAME, // 数据库名称
    DB_USERNAME, // 目标数据库用户名
    DB_PASSWORD, // 目标数据库密码
} = process.env;
// 用于sequelize-cli的配置
const dbConfig = {
    development: {
        username: 'ledger_admin',
        password: '12345678',
        database: 'ledger',
        host: 'localhost',
        dialect: 'mysql'
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    }
}

module.exports = dbConfig