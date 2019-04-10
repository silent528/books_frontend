<template>
    <view>
        <view class="title ">
            男频
        </view>
        <view>
            <view class="uni-flex uni-row category" style="flex-wrap: wrap;">
                <view class="text" style="width: 280upx;" v-for="(category,index) in categories" :key="index" @click="goBookList(category.id)">
                    <view v-if="category.gender === 1" style="margin: 30upx;">{{ category.name }}</view>
                </view>
            </view>
        </view>
        <view class="title ">
            女频
        </view>
        <view>
            <view class="uni-flex uni-row category" style="flex-wrap: wrap;">
                <view class="text" style="width: 280upx;" v-for="(category,index) in categories" :key="index" @click="goBookList(category.id)">
                    <view v-if="category.gender === 0" style="margin: 30upx;">{{ category.name }}</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import api from '@/lib/api'
    export default {
        data() {
            return {
                categories: [],
            }
        },
        created: async function() {
            // 获取分类
            this.categories = await this.getCategories()
        },
        methods: {
            // 需要缓存
            async getCategories() {
                let ret = await api.getCategories()
                if (ret === false) {
                    return
                }
                return ret.data
            },
            goBookList(id) {
                uni.navigateTo({
                    url: '/pages/books/list?sid=' + id
                })
            },
        }
    }
</script>

<style>
    /* #ifdef MP-ALIPAY */
    .swiper-tab-list {
        display: inline-block;
    }

    /* #endif */
    .uni-tab-bar .active{
        color: #0079ff;
    }
    .category {
        /*width:200upx;*/
        display: flex;
        /*text-align: center;*/
        padding: 20upx 36upx;
    }
</style>
