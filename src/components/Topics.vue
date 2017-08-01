<template>
    <div>
        <div v-for="topic in topics" class="card">
            <div class="title">
                <h3>{{topic.post_title}}</h3>
            </div>
            <div class="post_content" v-html="topic.post_content"></div>
            <div class="meta">
                <span class="ctime">{{ topic.post_modified | parseTime }}</span>
                <span class="comments"> 评论数: {{ topic.comment_count }}条</span>
            </div>
        </div>
        <div class="loadmore">
            <a href="javascript:void(0)" @click='getTopics' v-html="hasmore ? '加载更多...' : '加载完毕'"></a>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import $ from 'jquery'

export default {
    computed: {
        ...mapGetters({
            topics: 'getTopics',
            hasmore: 'getHasMore'
        })
    },
    created () {
    },
    asyncData ({ store }) {
        return store.dispatch(`getTopics`)
    },
    methods: {
        ...mapActions([
          'getTopics'
        ])
    }
}
</script>
<style lang="stylus">
    .card {
        background-color: #fff;
        padding: 16px 20px;
        margin: 10px 0;
        border: 1px solid #e7eaf1;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,37,55,.05);
        overflow: hidden; 

        .title {
            font-size: 22px;
        }
        .post_content {
            margin: 10px 0;
            line-height: 1.8em;
            color: #6f6f6f;
            h1,h2,h3,h4,h5 {
                margin: 5px 0;
                color: #333;
            }
            a {
                text-decoration: underline;
            }
        }
        .meta {
            color: #8590a6;
            font-size: 14px;
        }
    }
    .loadmore {
        text-align: center;
        a {
            display: inline-block;
            width: 200px;
            height: 40px;
            line-height: 40px;
            border: 1px solid silver;
            background-color: #FFF;
            margin: 20px 0 30px;
        }
    }
</style>
