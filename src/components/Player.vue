<template>
  <div class="player">
    PLAYER {{ seat }}
  </div>
</template>

<script>

export default {
  name: "Player",
    data() {
      return {
        seat: "",
        playerName: ""
      }
    },
  methods: {
  },
  mounted(){
    this.seat = this.$store.getters.getPlayersNumber + 1
  }
}
</script>

<style scoped>
.player {

}
</style>