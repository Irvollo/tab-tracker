<template>
  <panel title="Youtube">
    <youtube
      :video-id="youtubeId"
      :player-width="500"
      :player-height="200">
    </youtube>
  </panel>
</template>

<script>
import VueYouTubeEmbed from 'vue-youtube-embed'

export default {
  props: [
    'youtubeId'
  ],
  components: {
    VueYouTubeEmbed
  }
}
</script>

<style scoped>

</style>
