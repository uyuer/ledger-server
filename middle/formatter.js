const { getType } = require("./../lib/utils");

function apiFormatter(ctx) {
    //如果有返回数据，将返回数据添加到data中
    let result = ['undefined', 'null'].includes(getType(ctx.body)) ? null : ctx.body;
    ctx.status = 200
    ctx.statusText = '访问正常'
    ctx.body = {
        code: 200,
        message: "success",
        data: result
    };
};

function formatter(pattern) {
    return async (ctx, next) => {
        try {
            await next();
            //通过正则的url进行格式化处理
            if (pattern.test(ctx.originalUrl) && ctx.status == 200) {
                apiFormatter(ctx);
            }
        } catch (error) {
            //继续抛，让外层中间件处理日志，onerror将会监听到错误，并处理错误
            ctx.app.emit('error', error, ctx)
        }
    };
};

module.exports = formatter;
