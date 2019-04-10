<template>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
    <view>
        <view class="uni-bg-white margin">
            <view>
                <view class="uni-flex uni-row" style="justify-content: space-between;">
                    <view class="text">月票榜</view>
                </view>
            </view>
            <view class="uni-list">
                <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(book,key) in ticketsRank" :key="key" @click="goDetail(book.id)">
                    <view class="uni-media-list">
                        <image class="uni-media-list-logo" :src="book.cover_url"></image>
                        <view class="uni-media-list-body">
                            <view class="uni-media-list-text-top">{{ book.name }}</view>
                            <view class="uni-media-list-text-bottom margin">{{ book.author_name }}</view>
                            <view class="uni-media-list-text-bottom margin desc">{{ book.desc }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    </scroll-view>
</template>
<script>
    import api from '@/lib/api'
    export default {
        data() {
            return {
                ticketsRank: [],
                scrollTop: 0,
                old: {
                    scrollTop: 0
                }
            }
        },
        created: async function() {
            // 猜你喜欢
            this.ticketsRank = await this.getBookLike()
        },
        methods: {
            scroll: function(e) {
                console.log(e)
                this.old.scrollTop = e.detail.scrollTop
            },
            goTop: function(e) {
                // 解决view层不同步的问题
                this.scrollTop = this.old.scrollTop
                this.$nextTick(function() {
                    this.scrollTop = 0
                });
                uni.showToast({
                    icon:"none",
                    title:"纵向滚动 scrollTop 值已被修改为 0"
                })
            },
            async getBookLike() {
                let ret = await api.getUserLikeBooks()
                if (ret === false) {
                    return
                }
                return ret.data
            },
            changeLike: function() {

            },
            goDetail: function (bookId) {
                uni.navigateTo({
                    url: `./detail?bookId=${bookId}`
                })
            },
        },
    }
</script>

<style>
    .text{
        margin:15upx 10upx;
        padding: 0 20upx;
        /*background-color: #ebebeb;*/
        height: 70upx;
        line-height: 70upx;
        text-align: center;
        color: #777;
        font-size: 26upx;
    }

    .book_name{
        width: 210upx;
        color: #808080;
    }

    .desc{
        overflow:hidden;
        height:88upx;
    }

    .margin{
        margin-top: 20upx;
    }

    .uni-media-list-logo{
        height: 200upx;
        width: 160upx;
    }

    .uni-media-list-body{
        height: 100%;
    }
</style>