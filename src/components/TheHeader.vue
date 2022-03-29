<template>
	<header class="header">
		<div class="wrappper">
			<TheNav />
		</div>
	</header>
</template>

<script>
import TheNav from "@/components/TheNav";
export default {
	components: { TheNav },
};
</script>

<style lang="scss" scoped>
.header {
	padding: 20px;
	background-color: $navy;
}
</style>
