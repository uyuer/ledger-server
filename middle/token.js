const gatherToken = async (ctx, next) => {
    let params = Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.header.authorization = ctx.header.authorization || params.token || ''
    await next();
}

const authUrl = (reg, verifyJwtToken) => {
    return async (ctx, next) => {
        if (reg.test(ctx.request.path)) {
            let authorization = ctx.header.authorization;
            let [, token] = authorization ? authorization.match(/^Bearer\s(.+)$/) : [];
            if (!token) {
                let err = new Error('没有token信息,未登录');
                err.status = 401;
                err.message = '没有token信息,未登录';
                return ctx.app.emit('error', err, ctx)
            }
            try {
                let decoded = await verifyJwtToken(token);
                let info = { ...decoded, token };
                ctx.session.user = info;
            } catch (error) {
                let err = new Error(error.messgae);
                err.status = 401;
                err.message = error.message;
                return ctx.app.emit('error', err, ctx)
            }
        }
        await next(ctx);
    }
}

module.exports = {
    gatherToken,
    authUrl
};