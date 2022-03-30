
export default {
  state: {
    posts: [],
  },
  mutations: {
    saveNewImg(state, post) {
      state.posts.push(post)
    },
    loadPosts(state, posts) {
      state.posts = posts
    },
    addLike(state, data) {
      state.posts.filter(post => {
        if (post.id === data.id) {
          post.likes = data.likes
        }
      })
    },
  },
  actions: {
    async saveNewImg(context, post) {
      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/posts.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({
          ...post
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      context.commit("saveNewImg", post)
    },
    async addLike(context, data) {
      const token = context.getters.token;
      const id = data.id;
      const like = data.likes

      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/posts/${id}/likes.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify(
          like
        )
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      context.commit("addLike", data)
    },
    async loadPosts(context) {
      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/posts.json?auth=${token}`)

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      const posts = []
      for (const key in responseData) {
        const post = {
          id: key,
          img: responseData[key].img,
          title: responseData[key].title,
          user: responseData[key].user,
          likes: responseData[key].likes,
          time: responseData[key].time,
        }
        posts.unshift(post)
      }
      context.commit("loadPosts", posts)
    },
  },

  getters: {
    getPosts(state) {
      return state.posts
    }
  }
}