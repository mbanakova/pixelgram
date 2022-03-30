<template>
	<div class="wrapper">
		<base-popup :show="!!error" @close="gotIt" title="Ошибка доступа">
			<p>{{ serverMessage }}</p>
		</base-popup>
		<base-popup :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-popup>
		<form @submit.prevent="auth" class="auth">
			<img src="@/assets/pixelgram.png" alt="" />
			<h1>Pixelgram</h1>
			<input
				type="text"
				placeholder="username"
				v-model="username"
				v-if="this.mode === 'signup'"
				required
			/>
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<button type="submit" class="button">
				{{ submitButtonName }}
			</button>
			<p>
				{{ switchText }}
				<button type="button" class="link" @click="switchAuthMode">
					{{ switchButtonName }}
				</button>
			</p>
		</form>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import BasePopup from "@/components/BasePopup.vue";
import BaseSpinner from "@/components/BaseSpinner.vue";
export default {
	components: { BasePopup, BaseSpinner },
	name: "Auth",
	data() {
		return {
			username: "",
			email: "",
			password: "",
			serverMessage: "",
			mode: "login",
			error: null,
			isLoading: false,
		};
	},
	computed: {
		...mapGetters(["userId"]),
		submitButtonName() {
			if (this.mode === "login") {
				return "Войти";
			} else {
				return "Зарегистрироваться";
			}
		},
		switchButtonName() {
			if (this.mode === "login") {
				return "Зарегистрироваться";
			} else {
				return "Войти";
			}
		},
		switchText() {
			if (this.mode === "login") {
				return "Впервые на сайте?";
			} else {
				return "Есть аккаунт?";
			}
		},
	},
	methods: {
		switchAuthMode() {
			if (this.mode === "login") {
				this.mode = "signup";
				console.log(this.mode + "mode");
			} else {
				this.mode = "login";
				console.log(this.mode + "mode");
			}
		},
		async auth() {
			const authData = {
				email: this.email,
				password: this.password,
			};

			const userName = {
				username: this.username,
				time: new Date().toLocaleString().replace(",", ""),
			};
			this.isLoading = true;
			try {
				if (this.mode === "login") {
					await this.$store.dispatch("login", authData);
					await this.$store.dispatch("getUserName");
					await this.$store.dispatch("fetchNotifications");
					this.$router.replace("/draw");
				} else {
					await this.$store.dispatch("signup", authData);
					await this.$store.dispatch("saveAuthData", authData);
					await this.$store.dispatch("saveUserName", userName);
					await this.$store.dispatch("getUserName");
					this.$router.replace("/draw");
				}
			} catch (error) {
				this.error = error.message;
				this.serverMessage = error.message;
			}
			this.isLoading = false;
		},
		gotIt() {
			this.error = null;
		},
	},
};
</script>
<style lang="scss" scoped>
h1 {
	color: $accent;
}
.card {
	max-width: 500px;
	width: 100%;
	align-self: center;
}

.credentials {
	align-self: center;
	display: flex;
	flex-direction: column;
	gap: 20px;

	& .button {
		align-self: flex-end;
	}
}

.form-group {
	display: flex;
	gap: 20px;

	@media (max-width: $mobile) {
		gap: 10px;
	}
}
label {
	padding: 5px 20px;
	text-align: center;
	cursor: pointer;

	@media (max-width: $mobile) {
		margin-right: 0;
	}
}

.auth {
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 40px;
	border: 2px solid $accent;
	border-radius: 10px;
	// background-image: url("./../assets/pixelgram.png");
	background-color: rgba(0, 0, 0, 0.6);
}

button[type="submit"] {
	margin-bottom: 30px;
}
p {
	align-self: center;
}
button {
	align-self: stretch;
}
</style>
