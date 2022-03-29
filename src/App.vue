<template>
	<TheHeader />
	<router-view />
</template>

<script>
import TheHeader from "@/components/TheHeader";
export default {
	name: "Home",
	components: {
		TheHeader,
	},
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
</style>
