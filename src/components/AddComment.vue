<template>
	<div class='comment'>
		<h3 class='title'>添加评论</h3>
		<div>
			<p>
				<label>绰号:</label> <input type="text" class='uname' v-model='uname' :class="{error: unameError}">
			</p>
			<textarea placeholder="写下你的评论..." v-model='data' :class="{error: dataError}"></textarea>
			<p>
				<input type="button" value="评论" @click='addcm'/>
			</p>
		</div>
	</div>
</template>
<script >
import $ from 'jquery'

export default {
	props: ['article'],
	data () {
		return {
			uname: '',
			data: '',
			unameError: 0,
			dataError: 0
		}
	},
	created () {
		// console.log(this.article)
	},
	methods: {
		addcm () {
			var self = this;
			if (!self.uname) {
				self.unameError = 1;
				return;
			}
			self.unameError = 0;
			if (!self.data) {
				self.dataError = 1;return;
			}
			self.dataError = 0;
			$.ajax({
				url: '/api/comments',
				type: "POST",
				data: {
					comment_author: self.uname,
					comment_content: self.data,
					comment_post_ID: self.article.ID
				},
				success: function (data) {
					self.$emit('addcm',data);
					self.uname = '';
					self.data = '';
				}
			});
		}
	}
}
</script>

<style lang="stylus" scoped>
	.comment {
		background-color: #FFF;
		padding: 16px 20px;
        margin: 10px 0;
        border: 1px solid #e7eaf1;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,37,55,.05);
        overflow: hidden;
        .title {
        	padding: 5px 0;
        	border-bottom: 1px solid silver;
        }
        p, textarea {
        	margin: 10px auto;
        }
        textarea {
        	width: 90%;height: 80px;
        	resize: none;
        	margin: 10px auto;
        	padding: 10px;
        }
        input.uname {
        	width: 200px;height: 26px;padding: 0 5px;
        }
        input.uname.error, textarea.error {
			border: 1px solid red;
        }
        input[type='button'] {
        	background-color: #0f88eb;
        	border: 0 none;
        	width: 60px;height: 40px;
        	color: #fff;font-size: 16px;
        	cursor: pointer;
        	border-radius: 3px;
        }
	}
</style>