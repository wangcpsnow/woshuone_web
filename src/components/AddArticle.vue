<template>
	<div class="admin">
		<p class="author">
			<label>江湖人称:</label> <input v-model='post_author' type="text">
		</p>
		<p class="title">
			<label>文章标题:</label> <input v-model='post_title' type="text">
		</p>
		<form action="/api/upload" method="post" enctype="multipart/form-data">
		    <h2>单图上传</h2>
		    <input type="file" name="imgFile">
		    <input type="button" value="提交" @click="upload($event)">
		    <p v-if='imgUrl'>图片上传地址: {{imgUrl}}</p>
		</form>

		<Tags :tags='tags' @addtags='addTags'></Tags>
		<mavon-editor v-model="post_content"></mavon-editor>
		<input type="button" value="发表" class='publish' @click="publish">
		<link rel='stylesheet' href="/assets/css/index.css">
	</div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Tags from './Tags.vue'

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
			post_title: '',
			addtags: [],
			imgUrl: ''
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
	components: {
		Tags
	},
	methods: {
		publish () { // 发表文章
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
					author: self.post_author,
					post_title: self.post_title,
					post_content: self.post_content
				},
				success: function (data) {
					self._add(data.insertId);
				}
			});
		},
		_add (articleid) { // 添加标签
			var self = this;
			if (!this.addtags.length || !articleid) {
				self.$router.push('/topics');
				return;
			}
			var tags = this.addtags.reduce(function (sum, item) {
				return sum + item.id + ',';
			}, "");
			tags = tags.substr(0, tags.length - 1);
			$.ajax({
				url: '/api/addterms',
				type: 'POST',
				data: {
					object_id: articleid,
					term_taxonomy_id: tags
				},
				dataType: 'json',
				success: function () {
					self.$router.push('/topics');
				}
			});
		},
		addTags (data) {
			this.addtags = data;
		},
		upload (e) {
			var self = this;
			var $file = $(e.target).parents('form').find('input[type=file]');
			if (!$file.val().trim()) {
				alert('请选择要上传的文件');
				return;
			}
			var files = $file.prop('files');
			var data = new FormData();
			data.append('imgFile', files[0]);
			this.$http.post('/api/upload', data, {
				cache: false,
				processData: false,
				contentType: false
			})
			.then((res) => {
				self.imgUrl = res.data;
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