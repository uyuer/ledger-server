require('dotenv').config({ path: '.env' }); // 版本不一样config方式不一样

const {
    PORT,
} = process.env;

const path = require('path')
// 上传文件临时位置
const ROOTPATH = path.resolve('.')

const database = require('./database');
const upload = require('./upload');
const email = require('./email');
const session = require('./session');

// 配置, 从全局变量中读取数据
module.exports = {
    PORT, // 项目启动端口
    ROOTPATH,
    API: '/api',
    database,
    upload,
    email,
    session,
}
