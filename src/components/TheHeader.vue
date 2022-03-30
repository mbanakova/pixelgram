<template>
	<header class="header" v-if="isAuthenticated">
		<div class="wrappper">
			<TheNav />
		</div>
	</header>
</template>

<script>
import { mapGetters } from "vuex";
import TheNav from "@/components/TheNav";
export default {
	components: { TheNav },
	computed: {
		...mapGetters(["isAuthenticated"]),
	},
};
</script>

<style lang="scss" scoped>
.header {
	padding: 20px;
	background-color: $navy;
}
</style>
