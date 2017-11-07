<template>
	<div class="home">
		<h3 class="title">最新文章</h3>
		<ul class="articles">
			<li v-for="topic in topics">
				<span>{{ topic.post_modified | parseTime }}</span> =>
				<router-link :to="{ name: 'article',params: {id: topic.ID} }" tag='a'>{{topic.post_title}}</router-link>
			</li>
			<li>
				<a href="/explore">更多文章</a>
			</li>
		</ul>
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
		background-color: #FFF;
		padding: 10px 0;
		margin-top: 10px;
		.title {
			border-bottom: 1px solid silver;
			margin: 0;
			padding: 10px;
		}
		.author {
			color: #8590a6;
		}
		.center {
			text-align: center;
		}
		li {
			list-style: square;
		}
	}
</style>