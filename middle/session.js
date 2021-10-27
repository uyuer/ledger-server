const koaSession = require("koa-session"); // 导入koa-session
const { session } = require('../config');

const setKoaSession = function (app) {
    app.keys = [session.SESSION_KEY]
    return koaSession(session.config, app)
}

module.exports = setKoaSession;