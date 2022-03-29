<template>
	<div class="wrapper">
		<main>
			<!-- <img alt="Vue logo" src="../assets/logo.png"> -->
			<section class="draw">
				<h2>Hi, {{ getUserName }}</h2>
				<div class="draw-panel">
					<ColorControls @pick-color="pickColor" @erase-color="eraseColor" />
					<div
						class="blackboard"
						ref="printMe"
						@mousedown="startDrag"
						@mouseup="stopDrag"
					>
						<div
							class="pixel"
							v-for="(pixel, key) in 256"
							:key="key"
							@click="paint"
							@mouseenter="dragPaint"
						></div>
					</div>
					<div class="output">
						<input
							type="text"
							placeholder="Назовите картинку"
							v-model="title"
							:class="{ warning: this.warning }"
						/>

						<button class="button" @click="saveUserImg">Commit</button>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import ColorControls from "@/components/ColorControls";
export default {
	name: "Draw",
	components: { ColorControls },
	data() {
		return {
			output: null,
			color: "#032e63",
			dragging: false,
			title: "",
			imageSrc: null,
			imgFile: null,
			warning: false,
		};
	},

	methods: {
		async print() {
			const el = this.$refs.printMe;
			// add option type to get the image version
			// if not provided the promise will return
			// the canvas.
			const options = {
				type: "dataURL",
			};
			this.output = await this.$html2canvas(el, options);
		},
		// imageSaver(output) {},
		async saveUserImg() {
			if (this.title == "") {
				console.log("no title");
				this.warning = true;
				return;
			}
			this.warning = false;
			await this.print();

			const post = {
				img: this.output,
				title: this.title,
				user: this.userId,
				userName: this.getUserName,
				likes: 0,
				time: new Date().toLocaleString().replace(",", ""),
			};

			await this.$store.dispatch("saveNewImg", post);
			this.$router.push("/gallery");
		},
		paint(e) {
			e.target.style.backgroundColor = this.color;
		},

		startDrag(e) {
			this.dragging = true;
			e.target.style.backgroundColor = this.color;
		},
		stopDrag() {
			this.dragging = false;
		},
		dragPaint(e) {
			if (this.dragging) {
				e.target.style.backgroundColor = this.color;
			}
		},
		pickColor(color) {
			this.color = color;
		},
		eraseColor(color) {
			this.color = color;
		},
	},
	mounted() {
		this.print();
	},

	computed: {
		...mapGetters(["getUserName", "userId"]),
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

.warning {
	border: 1px solid tomato;
}
</style>
