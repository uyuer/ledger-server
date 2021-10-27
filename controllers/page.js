const index = async (ctx, next) => {
    return ctx.render("index", {
        what: `SSO-Consumer One ${JSON.stringify(ctx.session.user)} \n --- ${JSON.stringify(ctx.state)}`,
        test: 'index 页面',
        title: "SSO-Consumer | Index"
    });
}
const play = async (ctx, next) => {
    return ctx.render("play", {
        what: `SSO-Consumer One ${JSON.stringify(ctx.session.user)}`,
        test: 'play页面',
        title: "SSO-Consumer | play"
    });
}
const email = async (ctx, next) => {
    return ctx.render("email", {
        title: "SSO-Consumer | play"
    });
}

module.exports = {
    index,
    play,
    email,
}