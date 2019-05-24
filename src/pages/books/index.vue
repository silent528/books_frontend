<template>
    <view class="page">
        <view class="uni-tab-bar">
            <scroll-view id="tab-bar" class="uni-swiper-tab uni-bg-black" scroll-x :scroll-left="scrollLeft">
                <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
                      :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
            </scroll-view>
            <swiper class="swiper uni-bg-white" :style="{height:height}" :current="tabIndex" duration="300" @change="changeTab">
                <swiper-item>
                    <book-index></book-index>
                </swiper-item>
                <swiper-item>
                    <book-rank></book-rank>
                </swiper-item>
                <swiper-item>
                    <bookCategory></bookCategory>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>
<script>
    import bookIndex from '@/components/books/books_index.vue'
    import bookCategory from '@/components/books/books_category.vue'
    import bookRank from '@/components/books/books_rank.vue'

    export default {
        components: {
            bookIndex,
            bookCategory,
            bookRank
        },
        data() {
            return {
                height: '',
                books: [],
                booksLike: [],
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 0,
                categories: [],
                tabBars: [{
                    name: '首页',
                    id: 'index'
                }, {
                    name: '排行',
                    id: 'rank'
                }, {
                    name: '分类',
                    id: 'category'
                }]
            }
        },
        onLoad: async function() {
            // console.log(uni.request({url: 'http://www.baidu.com'}))
            let h = await this.getSystemInfo()
            let scrollHeight = h[1].windowHeight
            console.log(scrollHeight)
            this.height = (scrollHeight) + 'px'
        },
        methods: {
            getSystemInfo: async function () {
                return await uni.getSystemInfo()
            },
            async changeTab(e) {
                let index = e.detail.current;
                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    width += result.width;
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
                    uni.createSelectorQuery().select('#' + id).fields({
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);
                    }).exec();
                });
            },
            async tapTab(index) { //点击tab-bar
                if (this.tabIndex === index) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
                        tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = index;
                }
            },


        }
    }
</script>

<style>
    .swiper-tab-list {
        width: 33.33%;
    }
    .uni-tab-bar .swiper-box{
        /*height: 582px;*/
    }

    .scroll-Y {
        height: 100%;
    }

    .scroll-view_H {
        white-space: nowrap;
        width: 100%;
    }

    .scroll-view-item {
        height: 300upx;
        line-height: 300upx;
        text-align: center;
        font-size: 36upx;
    }

    .scroll-view-item_H {
        display: inline-block;
        width: 100%;
        height: 300upx;
        line-height: 300upx;
        text-align: center;
        font-size: 36upx;
    }

</style>
