<template>
	<div class="wrapper">
		<ul class="notifications__list">
			<li
				class="notifications__item"
				v-for="(notification, key) in getNotifications"
				:key="key"
			>
				{{ notification.whoLiked }} liked your «{{ notification.title }}»
				picture at
				{{ notification.time }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["getNotifications"]),
	},
	created() {
		this.loadNotifications();
	},
	methods: {
		loadNotifications() {
			this.$store.dispatch("fetchNotifications");
		},
	},
};
</script>

<style lang="scss" scoped>
.notifications__list {
	display: flex;
	flex-direction: column;
	grid-gap: 10px;
}

.notifications__item {
	border: 1px solid $accent;
	padding: 10px;
	border-radius: 10px;
}
</style>
