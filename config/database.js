require('dotenv').config({ path: '.env' });
const {
    DB_USERNAME, // 目标数据库用户名
    DB_PASSWORD, // 目标数据库密码
    DB_NAME, // 数据库名称
    DB_HOST, // 数据库地址
    DB_PORT, // 数据库端口
} = process.env;

module.exports = {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
}