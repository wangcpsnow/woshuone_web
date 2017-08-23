<template>
    <div>
        <div v-for="topic in topics" class="topic">
            <div class="title">
                <!-- <transition :name="transition"> -->
                    <router-link :to="{ name: 'article',params: {id: topic.ID} }" tag='h3'>{{topic.post_title}}</router-link>
                <!-- </transition> -->
            </div>
            <div class="meta">
                <span class="ctime">{{ topic.post_modified | parseTime }}</span>
                <span class="author">{{ topic.author }}</span>
                <!-- <span class="comments"> 评论数: {{ topic.comment_count }}条</span> -->
            </div>
            <div class="post_content md-output-container" v-html="topic.post_content"></div>
        </div>
        <div class="loadmore">
            <a href="javascript:void(0)" @click='getMoreTopics' v-html="tips_more"></a>
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
        }),
        tips_more: function () {
            return '(已加载' + this.topics.length + '条) ' + (this.hasmore ? '加载更多...' : '加载完毕');
        }
    },
    data () {
        return {
            transition: 'slide-right'
        }
    },
    asyncData ({ store }) {
        return store.dispatch(`getTopics`)
    },
    methods: {
        ...mapActions([
          'getMoreTopics'
        ])
    }
}
</script>
<style lang="stylus">
    .topic {
        background-color: #fff;
        padding: 16px 20px;
        margin: 10px 0;
        border: 1px solid #e7eaf1;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,37,55,.05);
        overflow: hidden; 

        .title {
            font-size: 22px;
            h3 {
                cursor: pointer;
            }
        }
        .post_content {
            margin: 10px 0;
            line-height: 1.8em;
            color: #6f6f6f;
            h1,h2,h3,h4,h5 {
                margin: 10px 0;
                color: #333;
            }
            a {
                text-decoration: underline;
            }
        }
        .meta {
            color: #8590a6;
            font-size: 14px;
            span {
                margin-right: 5px;
            }
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
    .title h3 {
        margin: 0.5rem 0;
    }
</style>
