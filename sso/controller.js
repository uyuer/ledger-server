const superagent = require('superagent');

const { verifyJwtToken } = require("./jwtVerify");
const { ssoServerUrl, ssoServerJWTUrl, ssoServerLogoutUrl, ssoServerLoginUrl, appToken } = require("./config");
const info = async (ctx, next) => {
    ctx.body = ssoServerLoginUrl;
}
const logout = async (ctx, next) => {
    let { globalSessionID } = ctx.session?.user || {};
    let res = await superagent.post(ssoServerLogoutUrl).send({ globalSessionID })
    let { code, message, data } = res.body;
    ctx.session = null;
    ctx.body = true;
}
// 检查用户是否登录
const doLogin = async (ctx, next) => {
    let { ssoToken, serviceURL } = ctx.request.body;
    let redirectURL = null;
    if (ssoToken) {
        let res = await superagent.post(ssoServerJWTUrl).send({ ssoToken }).set('Authorization', appToken)
        let { code, message, data } = res.body;
        let token = data.token;
        let decoded = await verifyJwtToken(token);
        let info = { ...decoded, token };
        ctx.session.user = info;
        redirectURL = serviceURL;
    }
    if (ctx.session.user) {
        return ctx.body = {
            token: ctx.session.user.token,
            user: {
                id: ctx.session.user.id,
                username: ctx.session.user.username,
                email: ctx.session.user.email,
            },
            redirectURL,
        };
    }
    return ctx.throw(401, '未登录')
}

module.exports = {
    info,
    logout,
    doLogin,
}