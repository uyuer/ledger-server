const logger = require('./logger');
const param = require('./param');
const verifyParams = require('./verifyParams');
const formatter = require('./formatter');
const session = require('./session');
const token = require('./token');

module.exports = {
    logger, // 响应和错误日志
    param, // 合并get和post方法的请求参数，调用时为ctx.request.param
    verifyParams, // 验证用户传入参数，是否符合校验
    formatter, // API接口返回格式化
    session, // 设置koa-session配置
    token,
}