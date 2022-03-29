<template>
	<div class="gallery">
		<h1>This is a gallery page</h1>
		<section class="gallery-grid">
			<article class="gallery-card" v-for="(post, key) in getPosts" :key="key">
				<div class="img">
					<img :src="post.img" alt="" />
				</div>
				<h3 class="title">{{ post.title }}</h3>
				<h3 class="author">{{ post.userName }}</h3>
				<h3 class="date">{{ post.time }}</h3>
				<div class="reactions">
					<div class="like"><font-awesome icon="heart" />{{ post.likes }}</div>
				</div>
			</article>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Gallery",
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getPosts"]),
	},
	methods: {
		loadPosts() {
			this.$store.dispatch("loadPosts");
		},
	},
	created() {
		this.loadPosts();
	},
};
</script>
<style lang="scss" scoped>
.img {
	width: 300px;
}
</style>
