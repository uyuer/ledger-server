const router = require('koa-router')();
const controllers = require('../controllers');

const routes = {
	'post /api/play/findOne': { handler: controllers.play.findOne },
}
for (let key in routes) {
	let [method, path] = key.split(' ');
	let { middle, handler } = routes[key];
	let params = middle ? [middle, handler] : [handler];
	router[method](path, ...params)
}
module.exports = router;