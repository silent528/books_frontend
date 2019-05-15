<template>
    <view class="page">
        <view class="book-detail uni-bg-black">
            <image class="book-detil-logo" :src="book.cover_url"></image>
            <view class="uni-media-list-body" style="margin: 10px 10px;">
                <view class="uni-media-list-text-top margin">{{ book.name }}</view>
                <view class="uni-media-list-text-bottom margin">作者: {{ author.name }}</view>
                <view class="uni-media-list-text-bottom margin">分类: {{ category.name }}</view>
                <view class="uni-media-list-text-bottom margin">
                    <view>
                        <button class="mini-btn" :disabled="isFavorite" type="default" size="mini" @click="favorite(book.id)">
                            <view v-if="!isFavorite">加入书架</view>
                            <view v-if="isFavorite">已加入书架</view>
                        </button>
                        <button class="mini-btn" type="primary" size="mini" @click="reader(book.id, 1)">立即阅读</button>
                    </view>

                </view>
            </view>
        </view>

        <view class="uni-list uni-collapse uni-active margin">
            <view class="uni-list-cell">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="goChapters(book.id)">查看章节</view>
            </view>
                <view class="uni-list-cell">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="reader(book.id, 'last')">{{ book.latest_chapter || '章节暂时为空' }}</view>
            </view>
        </view>

        <view class="uni-bg-white margin">
            <view style="flex: 1;justify-content: space-between;">
                <view class="text book-desc">
                    <view>小说简介</view>
                    <view class="text uni-text-gray">{{ book.desc  }}</view>
                </view>
            </view>
        </view>
        <view class="comment uni-bg-white margin">
            <view>评论</view>
            <view class="uni-comment">
                <view class="uni-comment-list"  v-if="comment.length > 0">
                    <view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>网友</text>
                        </view>
                        <view class="uni-comment-date">
                            <text>08/10 08:12</text>
                        </view>
                        <view class="uni-comment-content">内容</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniIcon from '@/components/uni-icon/uni-icon.vue'
    import api from '@/lib/api'
    export default {
        components: {
            uniIcon
        },
        data() {
            return {
                bookId: 1,
                book: {},
                author: {},
                category: {},
                comment: [],
                config: {
                    sites: ['qzone', 'qq', 'weibo','wechat', 'douban'],
                    // disabled: ['google', 'facebook', 'twitter'],
                    // wechatQrcodeTitle   : '微信扫一扫：分享',
                    // wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
                },
                isFavorite: true,
            }
        },
        onShareAppMessage() {
            return {
                title: this.book.name,
                path: '/pages/books/detail?bookId=' + this.bookId
            }
        },
        onLoad : async function(event) {
            this.bookId = event.bookId
            this.getBookOperation(this.bookId)
            await this.getBookDetail(this.bookId)
            this.category = this.book.category
            this.author = this.book.author
        },
        methods: {
            getBookDetail: async function (id) {
                let ret = await api.getBookDetail(id)
                if (ret === false) {
                    return
                }
                this.book = ret.data
            },
            // 登录状态下判断小说可操作清单
            async getBookOperation(id) {
                if (this.$store.state.Auth.logged) {
                    let res = await api.getOperation(id, this.$store.state.Auth.auth)
                    this.isFavorite = res.data.favorite
                } else {
                    this.isFavorite = false
                }
            },
            reader: function (id, chapterId) {
                uni.navigateTo({
                    url: `./reader?bookId=${id}&chapterId=${chapterId}`
                })
            },
            goChapters: function(id) {
                uni.navigateTo({
                    url: `./chapters?bookId=${id}&bookName=` + encodeURIComponent(this.book.name)
                })
            },
            favorite: async function(id) {
                if (!this.$store.state.Auth.logged) {
                    uni.navigateTo({
                        url: '/pages/auth/login'
                    })
                    return false
                }
                let ret = await api.postFavorite(id, this.$store.state.Auth.auth)
                if (ret.status_code !== 0) {
                    uni.showToast({ title: ret.message, icon: 'none' })
                    return false
                }
                this.isFavorite = true
                uni.showToast({ title: ret.message, icon: 'success' })
            }
        }
    }
</script>

<style>
    .uni-list::before{
        background-color: white;
    }
    .uni-list::after{
        background-color: white;
    }
    .book-desc{
        text-align: left;
        padding: 11upx;
    }
    button {
        margin-top: 15upx;
        margin-bottom: 15upx;
    }

    .button-sp-area {
        margin: 0 auto;
        width: 60%;
    }

    .mini-btn {
        margin-right: 10upx;
    }
    .book-detail {
        padding: 20upx 32upx;
        box-sizing: border-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
    }
    .book-detil-logo{
        width: 200upx;
        height: 250upx;
    }
    .book {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .book-img {
        width: 100%;
    }

    .book-title {
        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .article-meta {
        padding: 20upx 40upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }

    .article-text {
        font-size: 26upx;
        line-height: 50upx;
        margin: 0 20upx;
    }

    .article-author,
    .article-time {
        font-size: 30upx;
    }

    .article-content {
        padding: 0 30upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
    .uni-media-list-body{
        height: 100%;
    }
    .margin{
        margin-top: 20upx;
    }
    .comment{
        padding: 20upx;
    }
</style>
