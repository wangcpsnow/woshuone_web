<template>
	<div class="tags">
		<label>文章标签:</label>
		<select >
			<option>--请选择--</option>
			<option v-bind="{term_id: item.term_id,name: item.name }" v-for='item in tags'>{{ item.name }}</option>
		</select>
	</div>
</template>

<script>

export default {
	props: ['tags']
}
</script>

<style lang="stylus" scoped>
	.tags {
		margin: 10px 0;
		select {
			height: 30px;width: 180px;
		}
	}
</style>