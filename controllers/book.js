const db = require('../lib/sequelize');
const rules = require('../config/rules');

// async function bookExists(where){
//     let { Book } = db.models;
//     let info = await Book.findOne({
//         where,
//     });
//     if (!info) {
//         return ctx.throw(400, '账簿不存在')
//     }
// }

exports.addOne = async (ctx) => {
    let params = ctx.verifyParams({
        name: rules.book.name,
        remark: rules.book.remark,
    })
    let { name, remark } = params;
    let { id: userId } = ctx.session.user || {};
    let { Book } = db.models;
    let isExit = await Book.findOne({ where: { userId, name } });
    if (isExit) {
        return ctx.throw(400, '账簿已存在')
    }
    let result = await Book.create({ userId, name, remark });
    ctx.body = result.id;
}
exports.findOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.book.id,
    })
    let { id } = params;
    let { id: userId } = ctx.session.user || {};
    let { Book, Detail } = db.models;
    let info = await Book.findOne({
        where: { id },
        attributes: ['id', 'name', 'remark', 'createdAt', 'updatedAt'],
        raw: true
    });
    if (!info)
        return ctx.throw(400, '账簿不存在')
    let expend = await Detail.sum('amount', { where: { userId, bookId: id, type: '0' } })
    let income = await Detail.sum('amount', { where: { userId, bookId: id, type: '1' } })
    ctx.body = { ...info, expend, income };
}
exports.findAll = async (ctx) => {
    let { id: userId } = ctx.session.user || {};
    let { Book, Detail } = db.models;
    let books = await Book.findAll({
        where: { userId },
        attributes: ['id', 'name', 'remark', 'createdAt', 'updatedAt'],
        raw: true
    });
    let finder = books.map(async item => {
        let { id } = item;
        let info = await Book.findOne({
            where: { id },
            attributes: ['id', 'name', 'remark', 'createdAt', 'updatedAt'],
            raw: true
        });
        let expend = await Detail.sum('amount', { where: { userId, bookId: id, type: '0' } })
        let income = await Detail.sum('amount', { where: { userId, bookId: id, type: '1' } })
        return { ...info, expend, income }
    })
    let result = await Promise.all(finder)
    ctx.body = result;
}
// 更新一条数据
exports.updateOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.book.id,
        name: rules.book.name,
        remark: rules.book.remark,
    })
    let { id, name, remark } = params;
    let { id: userId } = ctx.session.user || {};
    let { Book } = db.models;
    let info = await Book.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '账簿不存在')
    let [count] = await Book.update({ name, remark }, {
        where: { id, userId }
    })
    let result = count ? true : false;
    ctx.body = result;
}
// 删除一条数据
exports.deleteOne = async (ctx) => {
    let params = ctx.verifyParams({
        id: rules.book.id,
    })
    let { id } = params;
    let { id: userId } = ctx.session.user || {};
    let { Book } = db.models;
    let info = await Book.findOne({
        where: { id, userId },
    });
    if (!info)
        return ctx.throw(400, '账簿不存在')
    let count = await Book.destroy({
        where: { id, userId }
    })
    let result = count ? true : false;
    ctx.body = result;
}