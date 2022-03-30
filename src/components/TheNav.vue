<template>
	<nav class="nav">
		<router-link to="/" class="button">Welcome</router-link>
		<router-link to="/draw" class="button">Рисовать</router-link>
		<router-link to="/gallery" class="button">Галерея</router-link>
		<router-link to="/notifications" class="button button--notify"
			>Уведомления<span class="notify" v-if="getNotifications.length > 0">{{
				getNotifications.length
			}}</span></router-link
		>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["getNotifications"]),
	},
};
</script>
<style lang="scss" scoped>
.nav {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

.button--notify {
	position: relative;

	& span {
		position: absolute;
		content: "";
		top: -10px;
		right: -10px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: $crimson;
		color: $white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		line-height: 12px;
	}
}
</style>
