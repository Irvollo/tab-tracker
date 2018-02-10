<template>
<panel title="Song Metadata">
  <v-layout>
    <v-flex xs6>
      <div class="song-title">
        {{song.title}}
      </div>
      <div class="song-artist">
        {{song.artist}}
      </div>
      <div class="song-genre">
        {{song.genre}}
      </div>
      <v-btn
        orange
        class="orange"
        :to="{
          name: 'song-edit',
          params () {
            return {
              songId: song.id
            }
          }
        }"
        dark>
        Edit
      </v-btn>
      <v-btn
        v-if="isUserLoggedIn && !bookmark"
        class="orange"
        @click="setAsBookmark"
        dark>
        Set as Bookmark
      </v-btn>
      <v-btn
        v-if="isUserLoggedIn && bookmark"
        class="orange"
        @click="unsetAsBookmark"
        dark>
        Unset as Bookmark
      </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" />
      <br/>
      {{song.album}}
    </v-flex>
  </v-layout>
</panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    try {
      if (!this.isUserLoggedIn) {
        return
      }
      this.bookmark = (await BookmarksService.index({
        songId: this.$store.state.route.params.songId,
        userId: this.$store.state.user.id
      })).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          SongId: parseInt(this.$store.state.route.params.songId),
          UserId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
        console.log('works')
      } catch (err) {
        console.log(err)
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
