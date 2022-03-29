import { createStore } from 'vuex'
import auth from "./auth.js"
import image from "./image.js"

export default createStore({

  modules: {
    image, auth
  }
})
