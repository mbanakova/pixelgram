
export default {
  state: {
    notifications: []
  },
  mutations: {
    notifyUser(state, notification) {
      state.notifications.push(notification)
    },
    fetchNotifications(state, notification) {
      state.notifications = notification
    },
  },
  actions: {
    async notifyUser(context, notification) {

      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/notifications.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({
          ...notification
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }


      context.commit("notifyUser", notification)
    },

    async fetchNotifications(context) {
      const token = context.getters.token;
      const response = await fetch(`https://pixelgram01-default-rtdb.firebaseio.com/notifications.json?auth=${token}`)

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      const notifications = []
      for (const key in responseData) {
        const notification = {
          id: key,
          whoLiked: responseData[key].whoLiked,
          title: responseData[key].title,
          author: responseData[key].author,
          time: responseData[key].time,
        }
        notifications.push(notification)
      }
      context.commit("fetchNotifications", notifications)
    },
  },

  getters: {
    getNotifications(state, getters) {
      const userId = getters.userId;
      return state.notifications.filter(notification => notification.author === userId).reverse()
    }
  }
}