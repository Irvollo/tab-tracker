<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <div v-for="song in songs" :key="song.id">
          {{song.title}} -
          {{song.artist}} -
          {{song.album}}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      songs: null
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // Do a request to the backend for all the songs
    this.songs = (await SongService.index()).data
  }
}
</script>

<style scoped>

</style>
