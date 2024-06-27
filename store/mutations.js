export default {
  setUser(state, user) {
    state.user = user
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  clearUser(state) {
    state.user = null
    if (process.client) {
      localStorage.removeItem('user');
    }
  }
};
