// 获取参数
const param = async (ctx, next) => {
    ctx.request.param = {
        GET: ctx.request.query,
        POST: ctx.request.body,
    }[ctx.request.method];
    await next();
}
module.exports = param;