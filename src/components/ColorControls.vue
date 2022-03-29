<template>
	<form class="draw-controls">
		<div class="color-picks">
			<div class="brush" v-for="(brush, key) in palette" :key="key">
				<label :for="brush.color" class="pick"></label>
				<input
					type="radio"
					:id="brush.color"
					:value="brush.hex"
					v-model="color"
					@change="pickColor"
				/>
			</div>
		</div>
		<div class="color-select">
			<label for="color-select"></label>
			<input
				type="color"
				name="color-select"
				id="color-select"
				v-model="color"
				@change="pickColor"
			/>
		</div>
		<button type="button" value="#14181d" @click="eraseColor">erase</button>
	</form>
</template>

<script>
export default {
	emits: ["pickColor", "eraseColor"],
	data() {
		return {
			color: "#032e63",
			palette: [
				{
					color: "white",
					hex: "#ffffff",
				},
				{
					color: "red",
					hex: "#ff0000",
				},
				{
					color: "orange",
					hex: "#fd8300",
				},
				{
					color: "yellow",
					hex: "#f9fd00",
				},
				{
					color: "green",
					hex: "#2bff00",
				},
				{
					color: "black",
					hex: "#000000",
				},
				{
					color: "pink",
					hex: "#ff00ea",
				},
				{
					color: "purple",
					hex: "#9500ff",
				},
				{
					color: "blue",
					hex: "#003cff",
				},
				{
					color: "light-blue",
					hex: "#04d8fd",
				},
			],
		};
	},
	methods: {
		pickColor() {
			this.$emit("pick-color", this.color);
		},
		eraseColor() {
			this.$emit("erase-color", "#14181d");
		},
	},
};
</script>

<style lang="scss" scoped>
.draw {
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.draw-panel {
	display: flex;
	justify-content: center;
	gap: 40px;
}

.draw-controls {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.color-picks {
	display: grid;
	grid-template-columns: repeat(5, 20px);
	gap: 5px;
}

.brush {
	width: 20px;
	height: 20px;

	display: flex;
}

.pick {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid $accent;
	cursor: pointer;
	margin: 0;

	.brush:nth-of-type(1) & {
		background-color: #fff;
	}

	.brush:nth-of-type(2) & {
		background-color: #ff0000;
	}
	.brush:nth-of-type(3) & {
		background-color: #fd8300;
	}

	.brush:nth-of-type(4) & {
		background-color: #f9fd00;
	}

	.brush:nth-of-type(5) & {
		background-color: #2bff00;
	}

	.brush:nth-of-type(6) & {
		background-color: #000000;
	}

	.brush:nth-of-type(7) & {
		background-color: #ff00ea;
	}

	.brush:nth-of-type(8) & {
		background-color: #9500ff;
	}

	.brush:nth-of-type(9) & {
		background-color: #003cff;
	}

	.brush:nth-of-type(10) & {
		background-color: #04d8fd;
	}

	.color-picks--eraser & {
		background-color: #14181d;
	}
}

input[type="radio"] {
	appearance: none;
	position: absolute;
	padding: 0;
	margin: 0;
}

input[type="color"] {
	display: inline-block;
	width: 50px;
	padding: 0;
	border: none;
	cursor: pointer;
}

.blackboard {
	display: grid;
	grid-template-columns: repeat(16, 1fr);
	align-self: center;
}
.pixel {
	background-color: $dark;
	border: 1px solid #333;
	width: 20px;
	height: 20px;
	cursor: pointer;
}

.output {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}
.output-img {
	width: 160px;
}
</style>
