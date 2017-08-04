<template>
	<div class="admin">
		<p class="author">
			<label>江湖人称:</label> <input v-model='post_author' type="text">
		</p>
		<p class="title">
			<label>文章标题:</label> <input v-model='post_title' type="text">
		</p>
		<mavon-editor v-model="post_content"></mavon-editor>
		<input type="button" value="发表" class='publish' @click="publish">
		<link rel='stylesheet' href="/assets/css/index.css">
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'

var mavonEditor;
if (typeof window != 'undefined') {
	mavonEditor = require('mavon-editor');
	Vue.use(mavonEditor);
}

export default {
	data () {
		return {
			post_author: '',
			post_content: '',
			post_title: ''	
		}
	},
	methods: {
		publish () {
			var self = this;
			if (!self.post_author) {
				return;
			}
			if (!self.post_title) {
				return;
			}
			if (!self.post_content) {
				return;
			}
			$.ajax({
				url: '/api/posts',
				type: "POST",
				data: {
					post_author: self.post_author,
					post_title: self.post_title,
					post_content: self.post_content
				},
				success: function (data) {
					self.$router.push('/topics');
				}
			});
		}
	}
}
</script>

<style lang="stylus" scoped>
	.admin {
		background-color: #fff;
		padding: 16px 20px;
        margin: 10px 0;
        .title,.author {
        	input {
        		width: 300px;height: 26px;padding: 0 5px;font-size: 14px;
        	}
        }
        .publish {
        	margin: 10px 0;
        	background-color: #0f88eb;
        	border: 0 none;
        	width: 60px;height: 40px;
        	color: #fff;font-size: 16px;
        	cursor: pointer;
        	border-radius: 3px;
        }
	}
</style>