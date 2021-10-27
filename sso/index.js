const router = require('koa-router')();
const controller = require('./controller');

const routes = {
    'post /sso/logout': { handler: controller.logout },
    'post /sso/doLogin': { handler: controller.doLogin },
    'post /sso/view': { handler: controller.view },
    'post /sso/clear': { handler: controller.clear },
}
for (let key in routes) {
    let [method, path] = key.split(' ');
    let { middle, handler } = routes[key];
    let params = middle ? [middle, handler] : [handler];
    router[method](path, ...params)
}
module.exports = router;