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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
import { parseTime } from '../utils/filters'

export default {
    computed: {
        ...mapGetters({
            topics: 'getTopics'
        })
    },
    created () {
        // $('img').on('error', function () {
        //     console.log($(this).attr('src'));
        // })
    },
    asyncData ({ store }) {
        return store.dispatch(`getTopics`)
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
</style>
