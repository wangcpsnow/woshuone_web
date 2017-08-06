<template>
	<div>
		<div class="article">
			<div class="title">
	            <h3>{{article.post_title}}</h3>
	        </div>
	        <div class="meta">
                <span class="ctime">{{ article.post_modified | parseTime }}</span>
            </div>
	        <div class="post_content md-output-container" v-html="article.post_content"></div>
		</div>
		<div class="comments">
			<h3 class="title">查看评论 ({{ comments.length }}条)</h3>
			<div class="comment" v-for='(comment,index) in comments'>
				<h5>
					{{ index + 1 }} 楼 
					<span class='uname'>{{ comment.comment_author }}</span>
				</h5>
				<p class="time">{{ comment.comment_date | parseTime }}</p>
				<p v-html='comment.comment_content'></p>
			</div>
		</div>
		<div class="addcm">
			<AddComment :article="article" @addcm='addcomment'></AddComment>
		</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import AddComment from './AddComment'

export default {
	computed: {
        ...mapGetters({
            article: 'getArticle',
            comments: 'getComments'
        })
    },
    components: {
    	AddComment
  	},
	asyncData ({ store, route: { params: { id }}}) {
		return store.dispatch('getArticleData', { id: id })
	},
	methods: {
		addcomment (data) {
			this.comments.push(data);
		}
	}
}
</script>
<style lang="stylus" scoped>
	.article,.comments {
		background-color: #FFF;
		padding: 16px 20px;
        margin: 10px 0;
        border: 1px solid #e7eaf1;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,37,55,.05);
        overflow: hidden;
	}
	.article {
        .title {
            font-size: 22px;
        }
        .meta {
            color: #8590a6;
            font-size: 14px;
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
	}
	.comments {
		.comment {
			font-size: 14px;
			margin: 10px 0;
			border-top: 1px solid silver;
			h5,p{
				margin: 10px 0;
				font-weight: normal;
			}
			p.time {
				font-size: 12px;
				color: silver;
			}
		}
	}
</style>