const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require("koa-body");

const config = require('./config')
const middle = require("./middle") // 中间件
const index = require('./routes')
const sso = require("./sso")
const { verifyJwtToken } = require('./sso/jwtVerify');

// error handler
onerror(app)

// middlewares
app.use(middle.session(app))
app.use(
	koaBody({
		multipart: true,  // 支持文件上传
		formidable: {
			keepExtensions: true, // 保持文件的后缀
			maxFieldsSize: config.upload.maxFieldsSize, // 文件上传大小
			uploadDir: config.upload.tempFullPath, // 设置文件上传目录，临时文件目录，需要定时清理
			onFileBegin: (name, file) => { // 文件上传前的设置
				console.log(`上传文件: ${name}`);
			},
		},
	})
);
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require("koa-static")(__dirname + "/uploads"));

app.use(views(__dirname + '/views', {
	extension: 'ejs'
}))

app.use(middle.logger)
app.use(middle.param)
app.use(middle.verifyParams)

app.use(middle.token.gatherToken)
app.use(middle.token.authUrl(new RegExp(`^${config.API}`), verifyJwtToken)) // 检查是否登录
app.use(middle.formatter(new RegExp(`^${config.API}`)))
app.use(middle.formatter(new RegExp(`^${'/sso/'}`)))

app.use(index.routes(), index.allowedMethods())
app.use(sso.routes(), sso.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.info('捕获到错误信息\n', err)
	ctx.status = err.status || 500
	ctx.body = {
		code: err.status || 500,
		message: err.message || '异常错误',
		data: null,
	}
})

module.exports = app
