import { createStore } from 'vuex'
import auth from "./auth.js"
import image from "./image.js"
import notifications from "./notifications.js"

export default createStore({

  modules: {
    image, auth, notifications
  }
})
