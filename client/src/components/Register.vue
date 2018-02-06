<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form
            name="tab-tracker-form"
            autocomplete="off">
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
          </form>
          <br />
          <div class="error" v-html="error"></div>
          <br />
          <v-btn
            @click="register">
            Register
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
    async register () {
      try {
        const response = await AutheticationService.register({
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
.error {
  color: red;
}
</style>
