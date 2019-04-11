<template>
    <view class="content">
        <view class="search-box">
            <mSearch :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)"
                     @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
        </view>
        <view class="search-keyword" @touchstart="blur">
            <scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y="true">
                <view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList">
                    <view class="keyword-text" @tap="doSearch(row)">
                        <rich-text :nodes="row.author_name + ' ： ' + row.name"></rich-text>
                    </view>
                    <view class="keyword-img" @tap="setkeyword(row.name)">
                        <image src="/static/images/back.png"></image>
                    </view>
                </view>
            </scroll-view>
            <scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
                <view class="keyword-block" v-if="oldKeywordList.length>0">
                    <view class="keyword-list-header">
                        <view>历史搜索</view>
                        <view>
                            <image @tap="oldDelete" src="/static/images/delete.png"></image>
                        </view>
                    </view>
                    <view class="keyword">
                        <view v-for="book in oldKeywordList" @tap="doSearch(book)">{{book.name}}</view>
                    </view>
                </view>
                <view class="keyword-block">
                    <view class="keyword-list-header">
                        <view>热门搜索</view>
                        <view>
                            <image @tap="hotToggle" :src="'/static/images/attention'+forbid+'.png'"></image>
                        </view>
                    </view>
                    <view class="keyword" v-if="forbid==''">
                        <view v-for="book in hotKeywordList" @tap="doSearch(book)">{{book.name}}</view>
                    </view>
                    <view class="hide-hot-tis" v-else>
                        <view>当前搜热门搜索已隐藏</view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue'
    import api from '@/lib/api'

    export default {
        data() {
            return {
                defaultKeyword: '',
                keyword: '',
                oldKeywordList: [],
                hotKeywordList: [],
                keywordList: [],
                forbid: '',
                isShowKeywordList: false,
                loadingType: 'more',
                currentPage: 1,
                pagination: {},
            }
        },
        onLoad() {
            this.init()
        },
        components: {
            mSearch
        },
        onReachBottom() {
            if (!this.keyword) {
                return false
            }
            if (this.currentPage >= this.pagination.total_pages) {
                this.loadingType = 'noMore'
                return false
            }
            this.loadMore()
        },
        methods: {
            init() {
                this.loadDefaultKeyword()
                this.loadOldKeyword()
                this.loadHotKeyword()
            },
            blur() {
                uni.hideKeyboard()
            },
            loadMore: async function () {
                if (this.loadingType === 'loading') {
                    return false
                }
                this.loadingType = 'loading'
                this.currentPage = this.currentPage + 1
                let keywordList = await api.postSearch(this.keyword, this.currentPage)
                this.keywordList = this.keywordList.concat(keywordList.data)
                this.loadingType = 'more'
            },
            //加载默认搜索关键字
            loadDefaultKeyword() {
                this.defaultKeyword = '搜索小说'
            },
            //加载历史搜索,自动读取本地Storage
            loadOldKeyword() {
                const value = uni.getStorageSync('storage_search_history')
                if (value) {
                    let keywords = JSON.parse(value)
                    this.oldKeywordList = this.parseHistoryKeyword(keywords)
                }
            },
            parseHistoryKeyword(keywords) {
                let data = []
                for(let keyword of keywords) {
                    let b = keyword.split(':')
                    data.push({
                        id: b[0],
                        name: b[1],
                    })
                }
                return data
            },
            //加载热门搜索
            async loadHotKeyword() {
                let ret = await api.getHostSearch()
                if (ret !== false) {
                    this.hotKeywordList = ret.data
                }
            },
            async inputChange(event) {
                //兼容引入组件时传入参数情况
                let keyword = event.detail ? event.detail.value : event
                if (!keyword) {
                    this.keywordList = []
                    this.isShowKeywordList = false
                    return
                }
                this.currentPage = 1
                this.isShowKeywordList = true
                let ret = await api.postSearch(keyword, this.currentPage)
                this.keywordList = ret.data
                this.pagination = ret.meta.pagination
            },
            //顶置关键字
            setkeyword(keyword) {
                this.keyword = keyword
            },
            //清除历史搜索
            async oldDelete() {
                let ret = await uni.showModal({ content: '确定清除历史搜索记录？' })
                if (ret[1].confirm) {
                    this.oldKeywordList = []
                    uni.removeStorage({ key: 'storage_search_history' })
                }
            },
            //热门搜索开关
            hotToggle() {
                this.forbid = this.forbid ? '' : '_forbid'
            },
            //执行搜索
            async doSearch(book) {
                this.keyword = book.name ? book.name : this.keyword
                this.saveKeyword(book) //保存为历史
                uni.navigateTo({
                    url: `/pages/books/detail?bookId=${book.id}`
                })
            },
            //保存关键字到历史记录
            saveKeyword(book) {
                const key = 'storage_search_history'
                const keywordsHistory = uni.getStorageSync(key)
                let oldKeys = []
                if (keywordsHistory) {
                    oldKeys = JSON.parse(keywordsHistory)
                }
                let bookKey = book.id    + ':' + book.name

                let findIndex = oldKeys.indexOf(bookKey)
                if (findIndex === -1) {
                    oldKeys.unshift(bookKey)
                } else {
                    oldKeys.splice(findIndex, 1)
                    oldKeys.unshift(bookKey)
                }
                //最多10个纪录
                oldKeys.length > 10 && oldKeys.pop()
                uni.setStorage({ key: key, data: JSON.stringify(oldKeys) })
                this.oldKeywordList = this.parseHistoryKeyword(oldKeys)
            }
        }
    }
</script>
<style>
    .search-box {
        width: 95%;
        background-color: rgb(242, 242, 242);
        padding: 7.5px 2.5%;
        display: flex;
        justify-content: space-between;
    }

    .search-box .input-box {
        width: 85%;
        flex-shrink: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-box .search-btn {
        width: 15%;
        margin: 0 0 0 2%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        font-size: 14px;
        color: #fff;
        background: linear-gradient(to right, #ff9801, #ff570a);
        border-radius: 30px;
    }

    .search-box .input-box > input {
        width: 100%;
        height: 30px;
        font-size: 16px;
        border: 0;
        border-radius: 30px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0 3%;
        margin: 0;
        background-color: #ffffff;
    }

    .placeholder-class {
        color: #9e9e9e;
    }

    .search-keyword {
        width: 100%;
        background-color: rgb(242, 242, 242);
    }

    .keyword-list-box {
        height: calc(100vh - 55px);
        padding-top: 5px;
        border-radius: 10px 10px 0 0;
        background-color: #fff;
    }

    .keyword-entry-tap {
        background-color: #eee;
    }

    .keyword-entry {
        width: 94%;
        height: 40px;
        margin: 0 3%;
        font-size: 15px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px #e7e7e7;
    }

    .keyword-entry image {
        width: 30px;
        height: 30px;
    }

    .keyword-entry .keyword-text, .keyword-entry .keyword-img {
        height: 40px;
        display: flex;
        align-items: center;
    }

    .keyword-entry .keyword-text {
        width: 90%;
    }

    .keyword-entry .keyword-img {
        width: 10%;
        justify-content: center;
    }

    .keyword-box {
        height: calc(100vh - 55px);
        border-radius: 10px 10px 0 0;
        background-color: #fff;
    }

    .keyword-box .keyword-block {
        padding: 5px 0;
    }

    .keyword-box .keyword-block .keyword-list-header {
        width: 94%;
        padding: 5px 3%;
        font-size: 13.5px;
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    .keyword-box .keyword-block .keyword-list-header image {
        width: 20px;
        height: 20px;
    }

    .keyword-box .keyword-block .keyword {
        width: 94%;
        padding: 3px 3%;
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
    }

    .keyword-box .keyword-block .hide-hot-tis {
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: #6b6b6b;
    }

    .keyword-box .keyword-block .keyword > view {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        padding: 0 10px;
        margin: 5px 10px 5px 0;
        height: 30px;
        font-size: 14px;
        background-color: rgb(242, 242, 242);
        color: #6b6b6b;
    }
</style>
