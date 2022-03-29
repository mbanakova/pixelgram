<template>
	<nav class="nav">
		<router-link to="/" class="button">Welcome</router-link>
		<router-link to="/draw" class="button">Draw</router-link>
		<router-link to="/gallery" class="button">Gallery</router-link>
	</nav>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.nav {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}
</style>
