const { Sequelize } = require('sequelize');
const { database } = require('../config');

const user = require('../models/user')
const captcha = require('../models/captcha')
const client = require('../models/client')

const db = new Sequelize(
    database.DB_NAME,
    database.DB_USERNAME,
    database.DB_PASSWORD,
    {
        host: database.DB_HOST,
        port: database.DB_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true, // sequelize默认添加s
        }
    },
);

user(db, Sequelize.DataTypes);
captcha(db, Sequelize.DataTypes);
client(db, Sequelize.DataTypes);

try {
    (async () => {
        await db.authenticate();
    })()
    console.log('已成功建立连接');
} catch (error) {
    console.error('未能连接到数据库：', error);
}

module.exports = db;