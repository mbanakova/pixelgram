<template>
	<div class="wrapper gallery">
		<h1>Галерея шедевров</h1>
		<section class="gallery-grid">
			<article class="gallery-card" v-for="(post, key) in getPosts" :key="key">
				<div class="img">
					<img :src="post.img" alt="" />
				</div>
				<div class="gallery-content">
					<h3 class="title">«{{ post.title }}»</h3>
					<div class="bottom">
						<h3 class="date">{{ post.time }}</h3>

						<div class="reactions">
							<button
								class="heart"
								:class="{ crimson: post.likes > 0 }"
								@click="addLike(post)"
							>
								<font-awesome icon="heart" />
							</button>
							<p class="like">
								{{ post.likes }}
							</p>
						</div>
					</div>
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
		return {
			disabled: false,
		};
	},
	computed: {
		...mapGetters(["getPosts", "getUserName"]),
		hasLikes(likes) {
			return ++likes > 0;
		},
	},
	methods: {
		loadPosts() {
			this.$store.dispatch("loadPosts");
		},
		async addLike(post) {
			post.likes++;
			const data = {
				id: post.id,
				likes: post.likes,
			};
			await this.$store.dispatch("addLike", data);

			const notify = {
				id: post.id,
				author: post.user,
				title: post.title,
				whoLiked: this.getUserName,
				time: new Date().toLocaleString().replace(",", ""),
			};
			await this.$store.dispatch("notifyUser", notify);
		},
	},
	created() {
		this.loadPosts();
	},
};
</script>
<style lang="scss" scoped>
.gallery {
	display: flex;
	flex-direction: column;
	gap: 30px;
}
.gallery-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 60px;
}

.gallery-card {
	padding: 10px;
	border: 1px solid $accent;
	border-radius: 10px;
}

.img {
	& img {
		width: 100%;
	}
}

.gallery-content {
	display: flex;
	flex-direction: column;
	padding: 20px 20px 0;
	gap: 10px;
}
.bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
}
.date {
	font-size: 15px;
	color: $accent;
}
.reactions {
	align-self: flex-end;
	display: flex;
	align-items: center;
}

.heart {
	background-color: transparent;
	padding: 10px;
	border: none;
	cursor: pointer;
	color: grey;
	font-size: 20px;
	transition: $tr;

	&:hover {
		color: lighten($crimson, 20%);
	}

	&:active,
	&.crimson {
		color: $crimson;

		& svg {
			fill: $crimson;
		}
	}
}
</style>
