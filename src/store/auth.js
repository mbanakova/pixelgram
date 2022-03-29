// import firebase from "firebase";
const API_KEY = 'AIzaSyAXUgWD5ltMUZekLg5IUwYlM4WuMVXYZGE';
let timer;

export default {
  state: {
    uid: null,
    token: null,
    didAutoLogout: false,
    isLoggedIn: false,
    username: null,
    email: null,
    password: null,
    time: null,
  },
  actions: {
    async auth(context, payload) {
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;


      if (mode === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error.message)
        throw error
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('uid', responseData.localId)
      localStorage.setItem('tokenExpiration', expirationDate)

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        uid: responseData.localId
      })
    },
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      })
    },

    async saveAuthData(context, payload) {
      const uid = context.getters.userId;
      const token = context.getters.token;

      const credentials = {
        email: payload.email,
        password: payload.password,
      }

      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/users/${uid}/auth.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify({ ...credentials })
      })

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message);
        throw error;
      }
      context.commit('saveAuthData', { ...credentials })
    },
    async saveUserName(context, payload) {
      const uid = context.getters.userId;
      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/users/${uid}/username.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify({ ...payload })
      })

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message);
        throw error;
      }
      context.commit('saveUserName', { ...payload })
    },

    async getUserName(context) {
      const uid = context.getters.userId;
      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/users/${uid}/username.json?auth=${token}`)

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      const data = {
        username: responseData.username,
        time: responseData.time,
      }
      context.commit('saveUserName', data)
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return
      }

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn)

      if (token && uid) {
        context.commit('setUser', {
          token: token,
          uid: uid
        })
      }
    },

    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('uid')
      localStorage.removeItem('tokenExpiration')

      clearTimeout(timer);

      context.commit('setUser', {
        uid: null,
        token: null
      })
      context.commit('autoLogout');
    },
    autoLogout(context) {
      context.dispatch('logout')
      context.commit('autoLogout')
    },
  },
  mutations: {
    setUser(state, payload) {
      state.uid = payload.uid;
      state.token = payload.token;
      state.didAutoLogout = false;
      state.isLoggedIn = true;
    },
    autoLogout(state) {
      state.didAutoLogout = true;
      state.isLoggedIn = false;
    },
    saveAuthData(state, payload) {
      state.email = payload.email;
      state.password = payload.password;
    },
    saveUserName(state, payload) {
      state.username = payload.username;
      state.time = payload.time;
    },
  },
  getters: {
    userId(state) {
      return state.uid;
    },
    getUserName(state) {
      return state.username;
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    },
    isLoggedIn(state) {
      return !!state.isLoggedIn
    },
    didAutoLogout(state) {
      return state.didAutoLogout
    }
  },
}