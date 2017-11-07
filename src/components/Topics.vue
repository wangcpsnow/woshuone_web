<template>
	<div class="topics">
		<ul class="tags">
			<li v-for='tag in tags' :class="{'active': tag.term_id == active_id}">
				<a v-bind="{href: '#' + tag.term_id}" @click='changeTag(tag.term_id)'>{{ tag.name }}</a>
			</li>
		</ul>
		<ul class="articles">
			<li v-if='loading' class="loading">
				<img src="../assets/imgs/loading.gif" alt=""> loading...
			</li>
			<li v-for='article in articles'>
				<span class="ctime">{{ article.post_modified | parseTime }}</span>
				<a v-bind='{href: "/article/" + article.ID}'>{{ article.post_title }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
	data () {
		return {
			articles: [],
			loading: true,
			active_id: ''
		}
	},
	computed: {
		...mapGetters({
			tags: 'getAllTags'
		})
	},
	asyncData ({ store}) {
		return store.dispatch('getAllTags')
	},
	mounted () {
		this.getArticles();
	},
	methods: {
		changeTag (term_id) {
			var self = this;
			setTimeout(function () {
				if (self.active_id != term_id) {
					self.getArticles();
				}
			}, 100);
		},
		getArticles () {
			var hash = location.hash || '#2',
				tag_id = hash.replace('#', ''),
				self = this;
			self.active_id = tag_id;
			$.ajax({
				url: '/api/posts/terms/' + tag_id,
				type: "GET",
				success (data) {
					if (typeof data == 'string') {
						data = JSON.parse(data);
					}
					self.articles = data;
					self.loading = false;
				}
			});
		}
	}
}
</script>

<style lang="stylus" scoped>
	.topics {
		background-color: #fff;
		padding: 16px 20px;
        margin: 10px 0;
        .tags {
        	overflow: hidden;
        	padding-bottom: 10px;
        	border-bottom: 1px solid silver;
        	li {
        		float: left;
        		border: 1px solid silver;
        		border-radius: 6px;
        		margin: 5px 10px;
        		line-height: 24px;
        		padding: 0 10px;
        	}
        	li.active {
        		background-color: #268aef;
        		border-color: #268aef;
        		a {
        			color: #FFF;
        		}
        	}
        }
        .articles {
			.loading {
				text-align: center;
				img {
					vertical-align: middle;
					margin-right: 5px;
				}
			}
			.ctime {
				float: right;
				font-size: 12px;
				color: silver;
			}
        }
	}
</style>