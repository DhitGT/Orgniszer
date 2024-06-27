<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" color="primary">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        const data = await this.$firebase.signOut(this.$firebase.auth)
        console.log(data)
        this.$store.commit('setUser', null)
        this.$router.push('/auth/login')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
