<template>
    <view>
        <view class="title" style="color:#0bb20c;">{{ bookName }}</view>
        <scroll-view class="list" scroll-y @scrolltolower="loadMore()">
            <view class="uni-list uni-collapse uni-active margin">
                <view class="uni-list-cell" v-for="(chapter,index) in chapters" :key="index">
                    <view class="uni-list-cell-navigate uni-navigate-right" @click="reader(bookId, chapter.chapter_number)">{{ chapter.name }}</view>
                </view>
            </view>
            <view class="uni-tab-bar-loading uni-bg-white">
                <uni-load-more :status="loadingType" :contentText="loadingText"></uni-load-more>
            </view>
        </scroll-view>
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
                chapters: [],
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
            this.bookId = event.bookId
            this.bookName = event.bookName
            this.chapters = await this.getChapters(this.bookId, this.currentPage)
        },
        methods: {
            loadMore: async function () {
                if (this.loadingType === 'loading') {
                    return false
                }
                this.loadingType = 'loading'
                this.currentPage = this.currentPage + 1
                let chapters = await this.getChapters(this.bookId, this.currentPage)
                this.chapters = this.chapters.concat(chapters)
                this.loadingType = 'more'
            },
            getChapters: async function(bookId, page) {
                let ret = await api.getChapters(bookId, page)
                if (ret === false) {
                    return false
                }
                if (this.pagination === null) {
                    this.pagination = ret.meta.pagination
                }
                return ret.data
            },
            reader: (id, chapterId) => {
                uni.navigateTo({
                    url: `./reader?bookId=${id}&chapterId=${chapterId}`
                })
            },
        },

    }
</script>