<template>
	<teleport to="body">
		<div v-if="show" @click="tryClose" class="backdrop"></div>
		<transition name="popup">
			<dialog open v-if="show">
				<header class="standard">
					<slot name="header">
						<h2>{{ title }}</h2>
					</slot>
				</header>
				<section>
					<slot></slot>
				</section>
				<menu v-if="!fixed">
					<slot name="actions">
						<button @click="tryClose" class="standard">ok</button>
					</slot>
				</menu>
			</dialog>
		</transition>
	</teleport>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		fixed: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ["close"],
	methods: {
		tryClose() {
			if (this.fixed) {
				return;
			}
			this.$emit("close");
		},
	},
};
</script>

<style lang="scss" scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 10;
}

dialog {
	position: fixed;
	top: 20vh;
	left: 50%;
	transform: translateX(-50%);
	max-width: 500px;
	width: 90%;
	z-index: 100;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 0;
	border: none;
	margin: 0;
	overflow: hidden;
	background-color: white;

	@media (min-width: ( $mobile + 1px)) {
		width: 40rem;
	}
}

header {
	background-image: repeating-linear-gradient(
		-60deg,
		#0b4f6e,
		#0b4f6e 10px,
		#133957 10px,
		#133957 20px
	);
	color: white;
	width: 100%;
	padding: 1rem;
}

header h2 {
	margin: 0;
}

section {
	padding: 1rem;
}

menu {
	padding: 1rem;
	display: flex;
	justify-content: flex-end;
	margin: 0;
}

.popup-enter-from,
.popup-leave-to {
	opacity: 0;
	transform: translateX(-50%) scale(0.8);
}

.popup-enter-active {
	transition: all 0.3s ease-out;
}

.popup-leave-active {
	transition: all 0.3s ease-in;
}

.popup-enter-to,
.popup-leave-from {
	opacity: 1;
	transform: translateX(-50%) scale(1);
}
</style>
