const db = require('../lib/sequelize');
const { Op } = require("sequelize");
const rules = require('../config/rules');

exports.addOne = async (ctx) => {
    let params = ctx.verifyParams({
        label: rules.label.label,
    })
    let { label } = params;
    let { id: userId } = ctx.session.user || {};
    let { Label } = db.models;
    let isExit = await Label.findOne({ where: { userId, label } });
    if (isExit) {
        return ctx.throw(400, '标签已存在')
    }
    let result = await Label.create({ userId, label });
    ctx.body = result.id;
}
exports.findAll = async (ctx) => {
    let { id: userId } = ctx.session.user || {};
    let { Label } = db.models;
    let result = await Label.findAll({
        where: {
            [Op.or]: [
                { userId },
                { createdByUser: false }
            ]
        },
        attributes: ['id', 'label', 'createdByUser', 'createdAt', 'updatedAt'],
        raw: true
    });
    ctx.body = result;
}
exports.updateOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.label.id,
        label: rules.label.label,
    })
    let { id, label } = params;
    let { id: userId } = ctx.session.user || {};
    let { Label } = db.models;
    let info = await Label.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '标签不存在')
    let [count] = await Label.update({ label }, {
        where: { id, userId }
    })
    let result = count ? true : false;
    ctx.body = result;
}
exports.deleteOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.label.id,
    })
    let { id } = params;
    let { id: userId } = ctx.session.user || {};
    let { Label } = db.models;
    let info = await Label.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '标签不存在')
    let count = await Label.destroy({
        where: { id, userId }
    })
    let result = count ? true : false;
    ctx.body = result;
}