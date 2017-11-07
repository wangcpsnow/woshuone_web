<template>
	<div class="home">
		<div class="sidebar">
			<div class="terms">
				<h3 class="title">热门分类</h3>
				<ul>
					<li>
						<router-link :to="{ path: '/topics#4' }" tag='a'>JS</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/topics#5' }" tag='a'>CSS</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/topics#13' }" tag='a'>GIT</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/topics#23' }" tag='a'>那些年踩的坑</router-link>
					</li>
				</ul>
			</div>
			<div class="follow">
				<h3 class="title">Follow me</h3>
				<ul>
					<li>
						<a href="http://weibo.com/ifront" target="_blank">微博</a>
					</li>
					<li>
						<a href="https://github.com/wangcpsnow" target="_blank">GitHub</a>
					</li>
				</ul>
			</div>
			<div class="eggs">
				<h3 class="title">彩蛋</h3>
				<p>
					相传,这个网站有一个彩蛋,如找到请<a href="mailto:wangcpsnow@gmail.com">联系</a>我,会有惊喜哦 :)
				</p>
			</div>
		</div>
		<div class="main">
			<h3 class="title">最新文章</h3>
			<ul class="articles">
				<li v-for="topic in topics">
					<span>{{ topic.post_modified | parseTime }}</span> =>
					<router-link :to="{ name: 'article',params: {id: topic.ID} }" tag='a'>{{topic.post_title}}</router-link>
				</li>
				<li>
					<router-link :to="{ path: '/explore' }" tag='a'>更多文章</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	computed: {
        ...mapGetters({
            topics: 'getTopics'
        })
    },
    data () {
        return {
            transition: 'slide-right'
        }
    },
    asyncData ({ store }) {
        return store.dispatch(`getTopics`)
    }
}
</script>

<style lang="stylus" scoped>
	.home {
		margin-top: 10px;
		overflow: hidden;
		.sidebar > div, .main {
			background-color: #FFF;
			padding: 10px 0;
			.title {
				border-bottom: 1px solid silver;
				margin: 0;
				padding: 10px;
			}
			li {
				list-style: square;
			}
		}
		.sidebar {
			float: right;
			width: 260px;
			> div {
				margin-bottom: 10px;
			}
			.eggs {
				p {
					padding: 0 6px;
					font-size: 14px;
				}
			}
		}
		.main {
			margin-right: 280px;
			.author {
				color: #8590a6;
			}
			.center {
				text-align: center;
			}
		}
	}
</style>