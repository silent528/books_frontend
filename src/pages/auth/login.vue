<template>
    <view class="page_login">
        <!-- 头部logo -->
        <view class="head">
            <view class="head_bg">
                <view class="head_inner_bg">
                    <image style="width: 55px;height: 65px;" :src="imgInfo.head" class="head_logo"/>
                </view>
            </view>
        </view>
        <!-- 登录form -->
        <view class="login_form">
            <view class="input">
                <view class="img">
                    <image style="width:27px;height: 27px;" :src="imgInfo.icon_user"/>
                </view>
                <input type="text" v-model="username" placeholder="请输入用户账号">
                <view class="img">
                    <image @tap="delUser" class="img_del" :src="imgInfo.icon_del"/>
                </view>
            </view>
            <view class="line"/>
            <view class="input">
                <view class="img">
                    <image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd"/>
                </view>
                <input :type="pwdType" :value="password" @input="inputPwd" placeholder="请输入密码">
                <view class="img" @tap="switchPwd">
                    <image class="img_pwd_switch" :src="imgInfo.icon_pwd_switch"/>
                </view>
            </view>
        </view>
        <!-- 登录提交 -->
        <button class="submit" type="primary" @tap="handleSubmit" :loading="loggedIn" :disabled="loggedIn">登录</button>
        <view class="opts">
            <text @tap="goReg" class="text">立即注册</text>
            <text @tap="findPwd" class="text">忘记密码？</text>
        </view>
        <view class="quick_login_line">
            <view class="line"/>
            <text class="text">快速登录</text>
            <view class="line"/>
        </view>
        <view class="quick_login_list">
            <image @tap="thirdLogin('qq')" class="item" :src="imgInfo.qq"/>
            <image @tap="thirdLogin('wechat')" class="item" :src="imgInfo.wechat"/>
            <image @tap="thirdLogin('weibo')" class="item" :src="imgInfo.weibo"/>
        </view>
    </view>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import validate from '@/lib/validate'
    import api from '@/lib/api'

    export default {
        data() {
            const isUni = typeof(uni) !== 'undefined'
            return {
                username: '',
                password: '',
                pwdType: 'password',
                imgInfo: {
                    head: '/static/images/head.png',
                    icon_user: '/static/images/icon_user.png',
                    icon_del: '/static/images/icon_del.png',
                    icon_pwd: '/static/images/icon_pwd.png',
                    icon_pwd_switch: '/static/images/icon_pwd_switch.png',
                    qq: '/static/images/qq.png',
                    wechat: '/static/images/wechat.png',
                    weibo: '/static/images/weibo.png'
                }
            }
        },
        onLoad() {

        },
        computed: {
            ...mapState('Auth', ['loggedIn']),
        },
        methods: {
            ...mapActions('Auth', ['login']),
            inputUsername(e) {
                this.username = e.target.value
            },
            inputPwd(e) {
                this.password = e.target.value
            },
            delUser() {
                this.username = ''
            },
            switchPwd() {
                this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
            },
            findPwd() {
                uni.showToast({ title: '程序员正在努力开发', icon: 'none' })
                // uni.navigateTo({
                //     url: '/pages/auth/find-pwd'
                // })
            },
            goReg() {
                uni.showToast({ title: '程序员正在努力开发,请在网站上注册', icon: 'none' })
                // uni.navigateTo({
                //     url: '/pages/auth/reg'
                // })
            },
            thirdLogin(type) {
                uni.showToast({ title: '程序员正在努力开发', icon: 'none' })
                console.log(type)
            },
            async handleSubmit() {
                const { username, password } = this
                const auth = { username: username, password: password }
                //定义表单规则
                const rule = [
                    { name: 'username', checkType: 'email', errorMsg: '邮箱地址错误' },
                    // {
                    //     name: 'password',
                    //     checkType: 'reg',
                    //     // checkRule: /^[a-zA-Z]{1}[a-zA-Z0-9]{7,11}$/,
                    //     checkRule: /^[a-zA-Z0-9]{6,12}$/,
                    //     errorMsg: '密码只支持个以字母开头的8-12位字母或数字'
                    // },
                ]
                if (!validate.check(auth, rule)) {
                    uni.showToast({ title: validate.error, icon: 'none' })
                    return false
                }
                if (await this.login(auth) === false) {
                    uni.showToast({ title: '登录失败，用户名或密码错误', icon: 'none' })
                    return false
                }
                uni.switchTab({
                    url: '/pages/me/center'
                })
            }
        }
    }
</script>
<style>
    page {
        height: auto;
        min-height: 100%;
        background-color: #f5f6f8;
    }
</style>
<style lang="scss" scoped>
    $logo-padding: 10upx;
    $form-border-color: rgba(214, 214, 214, 1);
    $text-color: #B6B6B6;

    .page_login {
        padding: 20upx;
    }

    .head {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: $logo-padding;
        padding-bottom: $logo-padding;

        .head_bg {
            border: 1upx solid #fbecf1;
            border-radius: 50upx;
            width: 200upx;
            height: 200upx;
            display: flex;
            align-items: center;
            justify-content: center;

            .head_inner_bg {
                border-radius: 40upx;
                width: 80upx;
                height: 80upx;
                display: flex;
                background-color: #fc2c5d;
                align-items: flex-end;
                justify-content: center;
                overflow: hidden;
            }
        }
    }

    .login_form {
        display: flex;
        margin: 40upx;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1upx solid $form-border-color;
        border-radius: 20upx;

        .line {
            width: 100%;
            height: 1upx;
            background-color: $form-border-color;
        }

        .input {
            width: 100%;
            max-height: 100upx;
            display: flex;
            padding: 10upx;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            .img {
                min-width: 100upx;
                min-height: 100upx;
                margin: 10upx;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .img_del {
                width: 40upx;
                height: 40upx;
            }

            .img_pwd_switch {
                width: 28upx;
                height: 12upx;
            }

            input {
                outline: none;
                height: 30upx;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }
        }
    }

    .submit {
        margin-top: 30upx;
        margin-left: 40upx;
        margin-right: 40upx;
        color: white;
        background-color: rgba(252, 44, 93, 1.0);
        -webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

        &:active {
            /*color: #B6B6B6;*/
            /*background-color: rgba(252, 44, 93, 0.8);*/
        }
    }

    .opts {
        margin-top: 10upx;
        margin-left: 40upx;
        margin-right: 40upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .text {
            font-size: 30upx;
            color: $text-color;
        }
    }

    .quick_login_line {
        margin-top: 40upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .line {
            height: 1upx;
            width: 36%;
            background-color: rgba(211, 211, 213, 1);
        }

        .text {
            font-size: 30upx;
            color: rgba(200, 200, 200, 1);
            margin: 2upx;
        }
    }

    .quick_login_list {
        margin-top: 30upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .item {
            width: 80upx;
            height: 80upx;
            margin: 20upx;
        }
    }
</style>

