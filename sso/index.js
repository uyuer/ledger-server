const router = require('koa-router')();
const controller = require('./controller');

const routes = {
    'get /sso/info': { handler: controller.info },
    'post /sso/logout': { handler: controller.logout },
    'post /sso/doLogin': { handler: controller.doLogin },
}
for (let key in routes) {
    let [method, path] = key.split(' ');
    let { middle, handler } = routes[key];
    let params = middle ? [middle, handler] : [handler];
    router[method](path, ...params)
}
module.exports = router;