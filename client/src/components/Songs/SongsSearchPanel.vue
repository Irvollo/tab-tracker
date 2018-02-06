<template>
  <panel title="Search" >
    <v-text-field
      name="search"
      v-model="search"
      label="Search by title, artist, album or genre">
    </v-text-field>
  </panel>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search (value) {
      // Save the route name
      const route = {
        name: 'songs'
      }
      // If the search is different than null show the list
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    },
    '$route.query.search': {
      inmediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>
</style>
