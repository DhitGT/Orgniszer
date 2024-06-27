
export default {

  async login({ commit }, { email, password }) {
    try {
      const { user } = await this.$firebase.signInWithEmailAndPassword(this.$firebase.auth, email, password)
      commit('setUser', user)
    } catch (error) {
      console.error('Error logging in:', error)
    }
  },
  async loginWithGoogle({ commit }) {

  },
  async logout({ commit }) {
    try {
      await this.$firebase.signOut(this.$firebase.auth)
      commit('clearUser')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
};
