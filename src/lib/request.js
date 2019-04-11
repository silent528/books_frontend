/**
 * get方法包装
 * @param api
 * @param params
 * @param headers
 * @param auth
 * @returns {Promise<boolean>}
 */
let getRequest = async (api, params = {}, headers = {}, auth = false) => {
    if (!api) {
        return false;
    }
    if (auth !== false) {
        headers = {
            'Authorization': auth.token_type + ' ' + auth.access_token,
            ...headers
        };
    }
    let ret = await uni.request({
        url: api,
        data: params,
        header: headers
    });
    let err = ret[0]
    let result = ret[1]
    if (err) {
        return false
    }
    if (result.statusCode === 200) {
        return result.data
    }
    return false
    // let ret = await wx.pro.request({url: api, method: 'GET', data: params, headers: headers});
    // if (ret.statusCode === 500 && ret.data.error === 'ERR_SKEY_INVALID') {
    //     token.clear();
    //     await auth.login();
    //     headers['X-WX-SKEY'] = token.get();
    //     ret = await wx.pro.request({url: api, method: 'GET', data: params, headers: headers});
    // }
    // if (ret.statusCode >= 500) {
    //     // helper.showModal('操作失败', '服务器请求失败，请稍后再试');
    //     return false;
    // }
    // return ret;
};

/**
 * post方法包装
 * @param api
 * @param params
 * @param headers
 * @param auth
 * @returns {Promise<*>}
 */
let postRequest = async (api, params = {}, headers = {}, auth = false) => {
    if (!api) {
        return false;
    }
    if (auth !== false) {
        headers = {
            'Authorization': auth.token_type + ' ' + auth.access_token,
            ...headers
        };
    }
    let ret = await uni.request({
        url: api,
        data: params,
        header: headers,
        method: 'POST',
    });
    let err = ret[0]
    let result = ret[1]
    if (err) {
        return false
    }
    if (result.statusCode === 200) {
        return result.data
    }
    return false
    // if (api !== route.login && withLogin === true) {
    //     headers = {
    //         'X-WX-SKEY': token.get(),
    //         'AID': token.getAid(),
    //         ...headers
    //     };
    // }
    // let ret = await wx.pro.request({url: api, method: 'POST', data: params, headers: headers});
    // if (ret.statusCode === 500 && ret.data.error === 'ERR_SKEY_INVALID') {
    //     token.clear();
    //     await auth.login();
    //     headers['X-WX-SKEY'] = token.get();
    //     ret = await wx.pro.request({url: api, method: 'GET', data: params, headers: headers});
    // }
    // if (ret.statusCode >= 500) {
    //     // helper.showModal('操作失败', '服务器请求失败，请稍后再试');
    //     return false;
    // }
    // return ret;
};

module.exports = {
    post: postRequest,
    get: getRequest
};