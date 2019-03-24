<template>
    <view class="page">
        <view class="page__hd">
            <view class="weui-search-bar" id="search_bar">
                <form class="weui-search-bar__form">
                    <view class="weui-search-bar__box">
                        <input class="weui-search-bar__input" confirm-type="search" id="search_input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
                    </view>
                    <view for="search_input" style="line-height: 28px" class="weui-search-bar__label" id="search_text" :hidden="inputShowed" @click="showInput">
                        <span>搜索书名</span>
                    </view>
                </form>
            </view>
        <view class="page__bd">
            <view v-if="inputVal.length <= 0">
                <view class="uni-bg-white">
                    <view class="title">
                        <view class="uni-flex uni-row" style="justify-content: space-between;">
                            <view class="text">热门搜索</view>
                            <view class="text"><uniIcon type="refresh" size="18"></uniIcon></view>
                        </view>
                    </view>
                    <view>
                        <view class="tag-view" v-for="item in hotSearchKeyWord" :key="item.id">
                            <uni-tag v-bind:text="item.name" v-bind:type="item.color" circle="true" @click="goDetail(item.id)"></uni-tag>
                        </view>
                    </view>
                </view>
                <view class="uni-bg-white">
                    <view class="title">
                        <view class="uni-flex uni-row" style="justify-content: space-between;">
                            <view class="text">搜索历史</view>
                            <view class="text"><uniIcon type="trash" size="22"></uniIcon></view>
                        </view>
                    </view>
                    <view>
                        <view class="tag-view">
                            <uni-tag text="标签" inverted="true"></uni-tag>
                        </view>
                        <view class="tag-view">
                            <uni-tag text="标签" inverted="true"></uni-tag>
                        </view>
                        <view class="tag-view">
                            <uni-tag text="标签" inverted="true"></uni-tag>
                        </view>
                        <view class="tag-view">
                            <uni-tag text="标签" inverted="true"></uni-tag>
                        </view>
                    </view>
                </view>
            </view>

            <view class="weui-cells searchbar-result" v-if="inputVal.length > 0" style="display: block; transform-origin: 0upx 0upx; opacity: 1; transform: scale(1, 1);">
                <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                    <view class="weui-cell__bd">
                        <view>实时搜索文本</view>
                    </view>
                </navigator>
                <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                    <view class="weui-cell__bd">
                        <view>实时搜索文本</view>
                    </view>
                </navigator>
                <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                    <view class="weui-cell__bd">
                        <view>实时搜索文本</view>
                    </view>
                </navigator>
                <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                    <view class="weui-cell__bd">
                        <view>实时搜索文本</view>
                    </view>
                </navigator>
            </view>
        </view>
        </view>
    </view>
</template>
<script>
import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import api from '@/lib/api'
export default {

  data () {
    return {
        inputShowed: false,
        inputVal: "",
        hotSearchKeyWord: []
    }
  },
  components: {
      uniTag,
      uniIcon
  },
  methods: {
      showInput: function () {
          this.inputShowed = true
      },
      hideInput: function () {
          this.inputVal = ""
          this.inputShowed = false
      },
      clearInput: function () {
          this.inputVal = ""
      },
      inputTyping: function (e) {
          this.inputVal = e.detail.value
      },
      goDetail: function (bookId) {
          uni.navigateTo({
              url: `/pages/books/detail?bookId=${bookId}`
          })
      },
  },
  created () {
    console.log('created')
  },
    async onLoad() {
        // request
        let ret = await api.getHostSearch()
        if (ret !== false) {
            this.hotSearchKeyWord = ret.data
        }
    }
}
</script>

<style>
    .page .searchbar-result {
        display: none;
        margin-top: 0;
        font-size: 14upx
    }

    .page .searchbar-result .weui-cell__bd {
        padding: 2upx 0 2upx 20upx;
        color: #666
    }

    page {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background-color: #fff
    }

    view {
        font-size: 28upx;
        line-height: inherit
    }

    .example {
        padding: 0 30upx 30upx
    }

    .example-title {
        font-size: 32upx;
        line-height: 32upx;
        color: #777;
        margin: 40upx 25upx;
        position: relative
    }

    .example .example-title {
        margin: 40upx 0
    }

    .example-body {
        padding: 0 40upx
    }

    .tag-view {
        margin: 10upx 20upx;
        display: inline-block;
    }
    .weui-search-bar{
        border-bottom: 0px;
    }
</style>