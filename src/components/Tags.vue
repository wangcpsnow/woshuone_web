<template>
	<div class="tags_wrap">
		<label>文章标签:</label>
		<ul class="tags">
			<li v-for="tag in addtags">
				<i>{{ tag.name }}</i>
				<a href="javascript:void(0)" @click="rmTag(tag)">x</a>

			</li>
			<a href="javascript:void(0)" v-if='!addtags.length'>未选择标签</a>
		</ul>
		<div>
			<select @change='addtag($event)'>
				<option>--请选择--</option>
				<option v-bind="{term_id: item.term_id,name: item.name }" v-for='item in tags'>{{ item.name }}</option>
			</select>
		</div>
	</div>
</template>

<script>
// import $ from 'jquery'

export default {
	props: ['tags'],
	data () {
		return {
			addtags: []
		}
	},
	created () {
	},
	methods: {
		addtag (e) {
			var $option = $(e.target).find('option:selected'),
				term_id = $option.attr('term_id'),
				name = $option.attr('name'),
				tags = this.addtags;
			for (var i=0,l=tags.length;i<l;i++) {
				if (tags[i].id === term_id) {
					return;
				}
			}
			if (term_id) {
				this.addtags.push({
					"name": name,
					'id': term_id
				});
				this.$emit('addtags',this.addtags);
			}
		},
		rmTag (tag) {
			var addtags = this.addtags;
			for (var i = 0, l=addtags.length;i<l;i++) {
				if (addtags[i] === tag) {
					addtags.splice(i,1);
					break;
				}
			}
			this.$emit('addtags', addtags);
			this.addtags = addtags;
		}
	}
}
</script>

<style lang="stylus" scoped>
	.tags_wrap {
		margin: 10px 0;
		overflow: hidden;
		select {
			margin-left: 75px;
			height: 30px;width: 180px;
		}
		ul {
			overflow: hidden;
			display: inline-block;
			margin: 0;padding: 0;
		}
		li {
			float: left;
			margin: 0 3px;padding: 6px;
			background-color: #428bca;
			line-height: 20px;
			a,i {
				color: #FFF;
			}
			a {
				margin-left: 3px;
			}
		}
	}
</style>