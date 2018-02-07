<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          type="email"
          name="email"
          v-model="email"
          label="Email">
        </v-text-field>
        <v-text-field
          type="password"
          name="password"
          v-model="password"
          label="Password">
        </v-text-field>
        <br />
        <v-alert
            class="ml-4"
            :value="error"
            transition="scale-transition"
            error>
              {{error}}
          </v-alert>
        <br />
        <v-btn
          @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AutheticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AutheticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
