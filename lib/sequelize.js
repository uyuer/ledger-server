const { Sequelize } = require('sequelize');
const { database } = require('../config');

const book = require('../models/book')
const label = require('../models/label')
const detail = require('../models/detail')

const db = new Sequelize(
    database.DB_NAME,
    database.DB_USERNAME,
    database.DB_PASSWORD,
    {
        host: database.DB_HOST,
        port: database.DB_PORT,
        define: {
            freezeTableName: true, // [false:默认操作(自动转换为复数), true:阻止默认操作]
        },
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true, // [false:默认操作(decimal和newdecimal类型返回string), true:阻止默认操作];"mysql获取decimal类型数据为string"的问题
        }
    },
);

book(db, Sequelize.DataTypes);
label(db, Sequelize.DataTypes);
detail(db, Sequelize.DataTypes);

try {
    (async () => {
        await db.authenticate();
        // await db.sync();
        let { Detail, Label, Book } = db.models;
        Detail.belongsTo(Label, { foreignKey: 'labelId' })
        Detail.belongsTo(Book, { foreignKey: 'bookId' })
    })()
    console.log('已成功建立连接');
} catch (error) {
    console.error('未能连接到数据库：', error);
}

module.exports = db;