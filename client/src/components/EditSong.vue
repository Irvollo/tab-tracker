<template>
  <div>
    <v-layout>
      <v-flex xs4>
      <panel title="Song Metadata">
          <v-text-field
            label="Title"
            required
            :rules="[required]"
            v-model="song.title">
          </v-text-field>

          <v-text-field
            label="Artist"
            required
            :rules="[required]"
            v-model="song.artist">
          </v-text-field>

          <v-text-field
            label="Genre"
            required
            :rules="[required]"
            v-model="song.genre">
          </v-text-field>

          <v-text-field
            label="Album"
            required
            :rules="[required]"
            v-model="song.album">
          </v-text-field>

          <v-text-field
            label="Image URL"
            required
            :rules="[required]"
            v-model="song.albumImageUrl">
          </v-text-field>

          <v-text-field
            label="Youtube ID"
            required
            :rules="[required]"
            v-model="song.youtubeId">
          </v-text-field>
        </panel>
      </v-flex>
      <v-flex xs12>
        <panel title="Song Structure" class="ml-4">
          <v-text-field
              label="Lyrics"
              multi-line
              required
              :rules="[required]"
              v-model="song.lyrics">
            </v-text-field>

            <v-text-field
              label="Tab"
              multi-line
              required
              :rules="[required]"
              v-model="song.tab">
            </v-text-field>
          </panel>

          <v-alert
            class="ml-4"
            :value="error"
            transition="scale-transition"
            error>
              {{error}}
          </v-alert>

           <v-btn
            @click="save">
            Save
          </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  async mounted () {
    try {
      // This is how you get the parameter from a Route
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.show(songId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
