<template>
  <div class="table" :key="event">
      <div class="player" :style="style(active)" v-for="player in players" :key="player">
          PLAYER {{ seat }}: {{ name }}
      </div>
  </div>
</template>

<script>

export default {
  name: "Table",
  data() {
    return{
      players: [
        {name:"mama", seat: 0, color: "#f9f39f", active: false},
        {name:"", seat: 0, color: "#f9f39f", active: false},
        {name:"", seat: 0, color: "#f9f39f", active: false},
        {name:"", seat: 0, color: "#f9f39f", active: false},
        {name:"", seat: 0, color: "#f9f39f", active: false},
        {name:"", seat: 0, color: "#f9f39f", active: false}
      ],
    }
  },
  methods: {
    style(activeFlag){
      if(!activeFlag)
        return "display: none;";
      else
        return "display: flexbox;";
    },
    addPlayersData(name, seat){
      let counter = seat-1;
      this.players[counter].name = name;
      this.players[counter].seat = seat;
      this.players[counter].active = true;
      this.event = !this.event;
      document.getElementsByClassName("player")[counter].style = "display: flexbox";
    },
  },
  mounted(){
    this.$root.$on("addPlayer", (playerName, playerNumber) => this.addPlayersData(playerName, playerNumber));
  },
  computed: {

  }
}

</script>

<style scoped>
.table {
  background-image: url("../../public/table.svg");
  background-repeat: no-repeat;
  background-position: center;
  width: 50%;
  height: 50%;
  align-self: center;
  border: 1px red solid;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-between;
}

.player {
  width: 30%;
  height: 20%;
  font-size: 25px;
  color: yellow;
}
</style>