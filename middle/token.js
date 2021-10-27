const gatherToken = async (ctx, next) => {
    let params = Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.header.authorization = ctx.header.authorization || params.token || ''
    await next();
}

const authUrl = (reg, checkFn) => {
    return async (ctx, next) => {
        if (reg.test(ctx.request.path)) {
            if (!ctx.session.user) {
                return ctx.throw(401, '未登录')
            }
            let authorization = ctx.header.authorization;
            let [, token] = authorization ? authorization.match(/^Bearer\s(.+)$/) : [];
            if (!token) {
                return ctx.throw(401, '没有token信息,未登录')
            }
            try {
                let decoded = await checkFn(token);
            } catch (error) {
                return ctx.app.emit('error', error, ctx)
            }
        }
        await next(ctx);
    }
}

module.exports = {
    gatherToken,
    authUrl
};