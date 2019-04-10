<template>
    <view>
        <view v-if="books.length <= 0">暂无数据</view>
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="book in books" @click="goDetail(book.id)">
                <view class="uni-media-list">
                    <image class="uni-media-list-logo" :src="book.cover_url"></image>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">{{ book.name }}</view>
                        <view class="uni-media-list-text-bottom margin">{{ book.author.name }}</view>
                        <view class="uni-media-list-text-bottom margin desc">{{ book.desc }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
    import api from '@/lib/api'
    export default {
        components: {
            uniLoadMore
        },
        data() {
            return {
                bookId: '',
                name: '',
                sid: '',
                books: [],
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
        onReachBottom() {
            if (this.currentPage >= this.pagination.total_pages) {
                // 到底了
                this.loadingType = 'noMore'
                return false
            }
            this.loadMore()
        },
        onLoad: async function(event) {
            this.sid = event.sid
            // this.bookName = event.bookName
            this.books = await this.getBooks(this.sid, this.currentPage)
        },
        methods: {
            loadMore: async function () {
                if (this.loadingType === 'loading') {
                    return false
                }
                this.loadingType = 'loading'
                this.currentPage = this.currentPage + 1
                let books = await this.getBooks(this.sid, this.currentPage)
                this.books = this.books.concat(books)
                this.loadingType = 'more'
            },
            getBooks: async function(sid, page) {
                let ret = await api.getBooks(sid, page)
                if (ret === false) {
                    return false
                }
                if (this.pagination === null) {
                    this.pagination = ret.meta.pagination
                }
                return ret.data
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
        height:86upx;
    }
    .uni-media-list-logo{
        height: 200upx;
        width: 160upx;
    }
    .margin{
        margin-top: 20upx;
    }
    .uni-media-list-body{
        height: 100%;
    }
</style>