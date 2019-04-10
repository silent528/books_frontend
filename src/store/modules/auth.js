import api from '../../lib/api'
import { CLIENT_ID, SECRET } from '../../constants/config'

const state = {
    // 是否登录中
    loggedIn: uni.getStorageSync('loggedIn') || false,
    // 是否已经登录
    logged: uni.getStorageSync('logged') || false,
    // auth 信息
    auth: uni.getStorageSync('auth'),
    // 目前无用
    openid: null,
}

const getters = {
    logged(state) {
        return state.logged
    },

    auth(state) {
        return state.auth
    }
}

const actions = {
    async login({ commit, state }, payload) {
        commit('loginRequest')
        let data = {
            grant_type: 'password',
            username: payload.username,
            password: payload.password,
            client_id: CLIENT_ID,
            client_secret: SECRET,
            scope: '*'
        }
        let row = await api.authToken(data)
        commit('loginRequestFinish')
        if (row === false) {
            commit('loginFailure')
            return false
        }
        commit('loginSuccess', row)
        return true
    },

    logout({ dispatch, commit, getters, rootGetters }) {
        commit('logout')
        dispatch('User/logout', {}, {root: true})
        // console.log(dispatch)
    }
}

const mutations = {
    loginRequest(state) {
        state.loggedIn = true
    },
    loginRequestFinish(state) {
        state.loggedIn = false
    },
    loginSuccess(state, auth) {
        uni.setStorageSync('auth', auth);
        state.auth = auth
        uni.setStorageSync('logged', true);
        state.logged = true
    },
    loginFailure(state) {
        state.loggedIn = false
    },
    logout(state) {
        uni.removeStorageSync('auth')
        state.auth = null
        uni.removeStorageSync('logged')
        state.logged = false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}