<template>
    <view class="page">
        <view class="title">{{ chapter.name }}</view>
        <view class="content">
            <text class="content_text">{{ chapter.chapter_text }}</text>
            <!--#85898c-->
        </view>
    </view>
</template>

<script>
    import api from '@/lib/api'
    export default {
        components: {
        },
        data() {
            return {
                chapter: {
                    name: '',
                    chapter_text: ''
                }
            }
        },
        onLoad : async function(event) {
            let chapter = await this.getChapter(event.bookId, event.chapterId)
            if (chapter) {
                this.chapter = chapter
            }
        },
        methods: {
            getChapter: async (id, chapterId) => {
                let ret = await api.getChapterDetail(id, chapterId)
                if (ret === false) {
                    return null
                }
                return ret.data
            },
        }
    }
</script>

<style>
    .content{
        margin: 36upx;
    }
    .content_text{
        font-size: 40upx;
    }
</style>
