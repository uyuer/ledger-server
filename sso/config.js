const fs = require("fs");
const path = require("path");

const {
    ISSUER, // 发行者
    SSO_SERVER_URL, // 认证服务地址
    CLIENT_APP_TOKEN, // 子系统sso访问令牌
    JWT_PUBLIC_KEY, // 公有密钥
} = process.env;

const publicKey =
    JWT_PUBLIC_KEY.replace(/\\n/g, '\n') ||
    fs.readFileSync(path.resolve(__dirname, "./jwtPublic.key"));

const ssoServerUrl = SSO_SERVER_URL;
const ssoServerLoginUrl = ssoServerUrl + '/login';
const ssoServerJWTUrl = ssoServerUrl + '/sso/verifytoken';
const ssoServerLogoutUrl = ssoServerUrl + '/sso/logout';

const appToken = `Bearer ${CLIENT_APP_TOKEN}`;

module.exports = {
    ISSUER,
    publicKey,
    ssoServerUrl,
    ssoServerJWTUrl,
    ssoServerLoginUrl,
    ssoServerLogoutUrl,
    appToken,
}