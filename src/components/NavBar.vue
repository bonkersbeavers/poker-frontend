<template>
  <div class="navBar">
    <p style="font-size: 50px">Players: {{ numberOfPlayers}}</p>
    <button onclick="this.addPlayer">Add player</button>
    <input
        class="mb2"
        type="text"
        placeholder="enter player's name">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavBar",
  data(){
    return{
      numberOfPlayers: 0,
      seat: "",
      playerName: "",
      maxPlayers: 6
    }
  },
  methods: {
    addPlayer() {
      if(this.numberOfPlayers < this.maxPlayers){
        this.numberOfPlayers++;
        this.$root.$emit("addPlayer");
      }
      else{
          alert("No more room for another players.")
      }
    }
  },
  computed: mapGetters(["getPlayersNumber"]),
  watch:{
    getPlayersNumber: function() {
      this.numberOfPlayers = this.getPlayersNumber
    }
  }
}
</script>

<style scoped>
  .navBar{
    width: 100%;
    height: 10%;
    background-color: white;
    display: flex;
  }
</style>