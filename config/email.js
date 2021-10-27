const {
    E_MAIL, // 发件邮箱地址
    E_PASS, // 发件邮箱密码(需要开启POP3/SMTP服务、获取授权码)
    CODEVALIDTIME, // 邮箱验证码有效时间
} = process.env;

module.exports = {
    E_MAIL,
    E_PASS,
    CODEVALIDTIME,
}