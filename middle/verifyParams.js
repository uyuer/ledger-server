/* 
fields: {
    username: [{ required: true, message: "用户名不可为空" }, { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/, message: "用户名由2~20位中文、英文、数字和下划线字符组成" }],
    password: [{ required: true, message: "密码不可为空" }],
    repassword: [{ required: true, message: "重复密码不可为空" }],
    male: [{ required: false, message: "" }, { pattern: /[012]/, message: "性别参数错误" }],
    email: [{ required: true, message: "邮箱不可为空", }, { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: "邮箱格式错误" }],
    code: [{ required: true, message: "验证码不可为空" }, { pattern: /^\d{4}$/, message: "验证码输入错误" }],
},
*/
const typeList = ['required', 'pattern', 'validator']; // 验证时顺序
const typeValidFn = {
    required: function (value, condition, message) {
        if (!condition || (condition && value)) {
            return { valid: true, message }
        }
        return { valid: false, message }
    },
    pattern: function (value, condition, message) {
        let patt = new RegExp(condition);
        return { valid: patt.test(value), message }
    },
    validator: function (value, condition, message) {
        let isFunction = Object.prototype.toString.call(condition).match(/^\[object\s(.*)\]$/)[1].toLowerCase() === 'function';
        if (!isFunction) {
            return { valid: false, message }
        }
        return { valid: condition(value), message }
    }
}
const verifyParams = async (ctx, next) => {
    ctx.verifyParams = function (fields) {
        let query = {
            GET: ctx.request.query,
            POST: ctx.request.body,
        }[ctx.request.method];
        let param = {};
        for (let key in fields) {
            param[key] = query[key];
        }
        // 尝试使用生成器函数完成参数验证
        let checkParams = function* (fields, param) {
            for (let key in fields) {
                let field = fields[key];
                let value = param[key];
                let order = [];
                // 整理排序,按typeList顺序排序
                for (let i = 0; i < typeList.length; i++) {
                    let rule = field.find(function (item) {
                        return typeList[i] in item;
                    })
                    if (rule) {
                        order[order.length] = { ...rule, type: typeList[i] };
                    }
                }
                for (let i = 0; i < order.length; i++) {
                    let { type, [type]: condition, message } = order[i];
                    yield typeValidFn[type](value, condition, message)
                }
            }
        }
        let checker = checkParams(fields, param);
        let result = null;
        for (let isDone = false; !isDone;) {
            let temp = checker.next();
            let { value, done } = temp;
            if (done) {
                result = { valid: true };
                break;
            }
            let { valid } = value || {};
            if (!valid) {
                result = value;
                break;
            }
        }
        let { valid, message } = result || {};
        if (!valid) {
            return ctx.throw(400, message);
        }
        return param
    }
    await next();
}
module.exports = verifyParams;