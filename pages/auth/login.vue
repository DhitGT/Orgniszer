<template>
  <v-container class="flex justify-center items-center min-h-screen">
    <v-card class="pa-5 w-full max-w-sm">
      <v-card-title class="text-center">{{ user }}</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            required
            :rules="emailRules"
            prepend-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            :rules="passwordRules"
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-btn
            class="w-full mt-4"
            color="primary"
            @click="loginWithEmail"
            :disabled="!valid"
            >Login with Email</v-btn
          >
          <v-btn class="w-full mt-4" color="secondary" @click="loginWithGoogle"
            >Login with Google</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
    }
  },
  methods: {
    async loginWithEmail() {
      try {
        await this.$firebase.signInWithEmailAndPassword(
          this.$firebase.auth,
          this.email,
          this.password
        )
        this.$router.push('/')
      } catch (error) {
        console.error('Error logging in with email:', error)
      }
    },
    async loginWithGoogle() {
      const provider = this.$firebase.googleProvider
      try {
        const data = await this.$firebase.signInWithPopup(
          this.$firebase.auth,
          provider
        )
        console.log(data.user)
        this.$store.commit('setUser', JSON.stringify(data.user)) // Commit mutation to update Vuex state
        console.log(this.user)
        this.$router.push('/crud') // Navigate to upon successful login
      } catch (error) {
        console.error('Error logging in with Google:', error)
      }
    },

    //afafsasfsfasf
  },
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
