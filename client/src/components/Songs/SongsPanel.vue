<template>
<panel title="Songs">
    <v-btn
        slot="action"
        class="orange"
        dark
        medium
        absolute
        right
        middle
        fab
        :to="{
          name: 'songs-create'
        }">
        <v-icon>add</v-icon>
    </v-btn>
    <div class="song" v-for="song in songs" :key="song.id">

        <v-layout>
        <v-flex xs6>
            <div class="song-title">
            {{song.title}}
            </div>
            <div class="song-artist">
            {{song.artist}}
            </div>
            <div class="song-genre">
            {{song.album}}
            </div>
            <v-btn
            class="orange"
            :to="{
              name: 'song',
              params: {
                songId: song.id
              }
            }"
            dark>
                View
            </v-btn>
        </v-flex>
        <v-flex xs6>
            <img class="album-image" :src="song.albumImageUrl" />
        </v-flex>
        </v-layout>
    </div>
</panel>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      songs: null
    }
  },
  watch: {
    // Listen to the actual route and brings the index everytime the query change
    '$route.query.search': {
      inmediate: true,
      async handler (value) {
        this.songs = (await SongService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size:24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width:  70%;
  margin: 0 auto;
}
</style>
