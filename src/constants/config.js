const MODE = {
    TEST: 'test',
    PROD: 'prod'
};

const CLIENT_ID = 11
const SECRET = 'Xr0TyDlpsbw9m2yf66MhtCsIqOL94T8Lcg4GBxUl'

// 此处切换环境
let currentMode = MODE.TEST;
let getDomain = (mode) => {
    if (mode === MODE.TEST) {
        return 'http://api.duokanxiaoshuo.site';
    }
    if (mode === MODE.PROD) {
        // 暂时没有生产环境api
        return ''
    }
    return false;
};

let getAuthDomain = (mode) => {
    return 'http://passport.duokanxiaoshuo.site'
}

module.exports = {
    MODE,
    currentMode,
    getDomain: getDomain,
    getAuthDomain: getAuthDomain,
    CLIENT_ID,
    SECRET
};

