<template>
    <view class="booklist-container">
        <view class="list">
            <view class="all" :if="favorites.length > 0">
                <block class="bookitem" v-for="(favorite,index) in favorites" :key="index">
                    <view class="bookInfo" bindtap="goToBookDetail" @click="goDetail(favorite.book_id)">
                        <text class="bookName">{{ favorite.book.name }}</text>
                        <text class="author">
                            <text class="text-underline">作者：{{ favorite.book.author_name }}</text>
                        </text>
                        <text class="bookDes">{{ favorite.book.desc }}</text>
                    </view>
                    <image :src="favorite.book.cover_url" mode="scaleToFill" />
                </block>
            </view>
            <view class="empty" v-if="favorites.length <= 0">
                <button @click="goIndex()" plain="true" type="default">您还未添加书籍，快去书城看看</button>
            </view>
        </view>
    </view>
</template>
<script>
    import api from '@/lib/api'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                favorites: [],
                loadingType: 'more',
                loadingText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多章节了"
                },
                currentPage: 1,
                pagination: null,
            }
        },
        computed: {
            ...mapState('Auth', ['auth']),
        },
        onShow: async function() {
            if (this.$store.state.Auth.logged) {
                this.favorites = await this.getFavorites()
            }
        },

        methods: {
            async getFavorites() {
                let ret = await api.getFavorites(this.currentPage, this.auth)
                if (ret === false) {
                    return false
                }
                if (this.pagination === null) {
                    this.pagination = ret.meta.pagination
                }
                return ret.data
            },
            goDetail(bookId) {
                uni.navigateTo({
                    url: `./detail?bookId=${bookId}`
                })
            },
            goIndex() {
                uni.switchTab({
                    url: `/pages/books/index`
                })
            }


        }
    }
</script>

<style>
    .booklist-container {
        background-color: #F2F2F2;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column; }

    .booklist-container .search {
        background-color: #fd9941;
        height: 85rpx; }

    .booklist-container .search .section {
        width: 96%;
        margin: 0 auto;
        height: 70rpx;
        position: relative; }

    .booklist-container .section .form {
        background-color: #fbb16f;
        width: 86%;
        height: 100%; }

    .booklist-container .search .input-block {
        width: 100%;
        height: 100%;
        line-height: 100%;
        color: #fff;
        display: inline-block;
        border-radius: 6rpx;
        font-size: 28rpx;
        position: relative; }

    .booklist-container .search .input-block > input {
        width: 100%;
        padding-left: 20rpx;
        height: 100%;
        box-sizing: border-box; }

    .booklist-container .search .input-block > icon {
        height: 70%;
        position: absolute;
        right: 17rpx;
        top: 17rpx;
        z-index: 999; }

    .booklist-container .search .search-block {
        position: absolute;
        top: 14rpx;
        left: 20rpx;
        height: 50rpx;
        line-height: 100%;
        font-size: 32rpx;
        color: #ddd; }

    .booklist-container icon.search-icon {
        width: 50rpx;
        display: inline-block;
        height: 100%;
        background-size: 230rpx 230rpx;
        background-position: -90rpx -90rpx;
        vertical-align: middle; }

    .booklist-container .toShop {
        width: 80rpx;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0; }

    .booklist-container icon.shop-icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        background-size: 230rpx 230rpx;
        background-position: 0rpx -100rpx;
        position: absolute;
        right: 10rpx;
        top: 15rpx; }

    .booklist-container .header {
        text-align: center;
        position: relative;
        background-color: #ffffff; }

    .booklist-container .header .headerLine {
        display: inline-block;
        height: 3rpx;
        width: 76%;
        background-color: #ccc;
        margin-top: 60rpx; }

    .booklist-container .header .headerTime {
        background-color: #ffffff;
        display: block;
        height: 20rpx;
        line-height: 20rpx;
        width: 240rpx;
        font-size: 32rpx;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 52rpx;
        transform: translateX(-50%);
        color: #888; }

    .booklist-container .header .timeTab {
        margin-top: 20rpx;
        padding-bottom: 20rpx; }

    .booklist-container .header .timeTab .everyTime {
        position: relative;
        display: inline-block;
        height: 100rpx;
        width: 100rpx;
        text-align: center; }

    .booklist-container .header .timeTab .everyTime > text {
        font-size: 24rpx;
        color: #888;
        vertical-align: middle;
        margin-right: 10rpx;
        line-height: 90rpx; }

    .booklist-container .header .timeTab .everyTime.last {
        margin-right: 0rpx; }

    .booklist-container .header .timeTab .everyTime.active {
        border: none;
        background-color: #fd9941;
        border-radius: 10rpx;
        box-shadow: 2rpx 2rpx 2rpx #cccccc; }

    .booklist-container .header .timeTab .everyTime.active > text {
        color: #fff; }

    .booklist-container .header .timeTab .everyTime > icon {
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translateX(-50%);
        display: block;
        height: 10rpx;
        width: 10rpx;
        border: none;
        border-radius: 5rpx;
        background-color: transparent; }

    .booklist-container .header .timeTab .everyTime > icon.hasRecord {
        background-color: #888; }

    .booklist-container .list {
        margin-top: 20rpx;
        padding: 30rpx 30rpx;
        background-color: #fff;
        flex: 1; }

    .booklist-container .list .empty{
        text-align: center; }

    .booklist-container .list .empty > image{
        margin-top: 40rpx;
        height: 300rpx;
        width: 300rpx; }

    .booklist-container .list .empty > button{
        margin-top: 30rpx;
        width: 70%;
        height: 70rpx;
        line-height: 70rpx;
        border-color: #fd9941;
        color: #fd9941;
        font-size: 30rpx; }

    .booklist-container .list .all > image {
        height: 180rpx;
        width: 140rpx;
        box-shadow: 4rpx 4rpx 2rpx #888;
        float: left;
        display: inline-block;
        margin-left: -100%;
        margin-bottom: 20rpx; }

    .booklist-container .list .bookInfo {
        float: left;
        width: 100%;
        padding: 10rpx 10rpx 10rpx 180rpx;
        font-size: 22rpx;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 20rpx;
        height:200rpx;
        overflow:hidden; }

    .booklist-container .list .bookInfo::after {
        content: "";
        display: none;
        clear: both; }

    .booklist-container .bookInfo > text {
        display: block;
        color: #353535; }

    .booklist-container .bookInfo .bookName {
        font-size: 24rpx;
        font-weight: bold; }

    .booklist-container .bookInfo .author {
        font-size: 22rpx;
        margin-top: 10rpx; }

    .booklist-container .bookInfo .bookDes {
        font-size: 22rpx;
        color: #888;
        margin-top: 20rpx;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;  }

    .booklist-container .bookInfo .text-underline {
        border-bottom: 4rpx solid #fd9941;
        margin-right: 10rpx;
        color: #888; }

    .booklist-container .bookInfo > icon {
        position: absolute;
        right: 20rpx;
        top: 10rpx;
        display: inline-block;
        width: 30rpx;
        height: 45rpx; }

    .booklist-container .bookInfo > icon.isRead {
        background-size: 210rpx 210rpx;
        background-position: -133rpx -80rpx; }

    .booklist-container .bookInfo > icon.notRead {
        background-size: 210rpx 210rpx;
        background-position: -176rpx -80rpx; }

</style>