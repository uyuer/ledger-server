const router = require('koa-router')();
const controllers = require('../controllers');

const routes = {
	'post /api/book/addOne': { handler: controllers.book.addOne },
	'get /api/book/findOne': { handler: controllers.book.findOne },
	'get /api/book/findAll': { handler: controllers.book.findAll },
	'post /api/book/updateOne': { handler: controllers.book.updateOne },
	'post /api/book/deleteOne': { handler: controllers.book.deleteOne },

	'post /api/detail/addOne': { handler: controllers.detail.addOne },
	'post /api/detail/addMultiple': { handler: controllers.detail.addMultiple },
	'get /api/detail/findAll': { handler: controllers.detail.findAll },
	'post /api/detail/updateOne': { handler: controllers.detail.updateOne },
	'post /api/detail/updateMultiple': { handler: controllers.detail.updateMultiple },
	'post /api/detail/deleteOne': { handler: controllers.detail.deleteOne },

	'post /api/label/addOne': { handler: controllers.label.addOne },
	'get /api/label/findAll': { handler: controllers.label.findAll },
	'post /api/label/updateOne': { handler: controllers.label.updateOne },
	'post /api/label/deleteOne': { handler: controllers.label.deleteOne },
}
for (let key in routes) {
	let [method, path] = key.split(' ');
	let { middle, handler } = routes[key];
	let params = middle ? [middle, handler] : [handler];
	router[method](path, ...params)
}
module.exports = router;