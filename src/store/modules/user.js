import api from '../../lib/api'
import { CLIENT_ID, SECRET } from '../../constants/config'

const state = {
    userInfo: uni.getStorageSync('storage_user_info') || false,
}

const getters = {
    userInfo(state) {
        return state.userInfo
    }
}

const mutations = {
    setUserInfo(state, userInfo) {
        userInfo.set = true
        uni.setStorageSync('storage_user_info', userInfo);
        state.userInfo = userInfo
    },
    logout(state) {
        uni.removeStorageSync('storage_user_info');
        state.userInfo = {}
    }
}

const  actions = {
    async getUserInfo({commit, dispatch, state, rootState}) {
        let ret = await api.getUserInfo(rootState.Auth.auth)
        commit('setUserInfo', ret)
    },
    logout({commit}) {
        commit('logout')
        return true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
