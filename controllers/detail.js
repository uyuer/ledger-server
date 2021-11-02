const db = require('../lib/sequelize');
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const rules = require('../config/rules');
const { updateMultiple } = require('../lib/method');

exports.addOne = async (ctx) => {
    let params = ctx.verifyParams({
        type: rules.detail.type,
        date: rules.detail.date,
        amount: rules.detail.amount,
        remark: rules.detail.remark,
        labelId: rules.detail.labelId,
        bookId: rules.detail.bookId,
    })
    let { id: userId } = ctx.session.user || {};
    let { Detail } = db.models;
    // 是否需要校验插入数据的bookId和labelId?
    let result = await Detail.create({ ...params, userId });
    ctx.body = result.id;
}
exports.addMultiple = async (ctx) => {
    let params = ctx.verifyParams([{
        type: rules.detail.type,
        date: rules.detail.date,
        amount: rules.detail.amount,
        remark: rules.detail.remark,
        labelId: rules.detail.labelId,
        bookId: rules.detail.bookId,
    }])
    console.log(params)
    let data = params.map(item => ({ ...item, userId }))
    let { id: userId } = ctx.session.user || {};
    let { Detail } = db.models;
    let count = await Detail.bulkCreate(data, { validate: true });
    let result = count.length ? true : false;
    ctx.body = result;
}
exports.findAll = async (ctx) => {
    let params = ctx.verifyParams({
        bookId: rules.detail.bookId,
        start: rules.detail.start,
        end: rules.detail.end,
    })
    let { bookId, start, end } = params;
    let { id: userId } = ctx.session.user || {};
    let { Detail, Label, Book } = db.models;
    let result = await Detail.findAll({
        where: {
            userId,
            bookId,
            date: {
                [Op.and]: {
                    [Op.gte]: start,
                    [Op.lt]: end
                }
            }
        },
        attributes: [
            'id', 'type', 'date', 'amount', 'createdAt', 'updatedAt', 'bookId', 'userId', 'labelId',
            [Sequelize.col('Book.name'), 'bookName'],
            Sequelize.col('Label.label'),
        ],
        include: [
            { model: Book, attributes: [] },
            { model: Label, attributes: [] }
        ],
        raw: true
    });
    ctx.body = result;
}
exports.updateOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.detail.id,
        type: rules.detail.type,
        date: rules.detail.date,
        amount: rules.detail.amount,
        remark: rules.detail.remark,
        labelId: rules.detail.labelId,
        bookId: rules.detail.bookId,
    })
    let { id, ...other } = params;
    let { id: userId } = ctx.session.user || {};
    let { Detail } = db.models;
    let info = await Detail.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '数据不存在')
    let count = await info.update(other, {
        where: { id, userId }
    })
    let result = count ? true : false;
    ctx.body = result;
}
exports.updateMultiple = async (ctx) => {
    let params = ctx.verifyParams([{
        id: rules.detail.id,
        type: rules.detail.type,
        date: rules.detail.date,
        amount: rules.detail.amount,
        remark: rules.detail.remark,
        labelId: rules.detail.labelId,
        bookId: rules.detail.bookId,
    }])
    let { id: userId } = ctx.session.user || {};
    let { Detail } = db.models;
    let values = params.map(item => ({ ...item, userId }))
    let result = await updateMultiple(Detail, values, 'id', `userId=${userId}`)
    ctx.body = true;
}
exports.deleteOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.detail.id,
    })
    let { id } = params;
    let { id: userId } = ctx.session.user || {};
    let { Detail } = db.models;
    let info = await Detail.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '数据不存在')
    let count = await info.destroy();
    let result = count ? true : false;
    ctx.body = result;
}
