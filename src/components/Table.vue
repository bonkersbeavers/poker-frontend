<template>
  <div class="table">
    <div class="player" :style="style(player.active)" v-for="(player,index) in players" :key="index">
      PLAYER {{ player.seat }}: {{ player.name }}
      SUBSCRIPTION: {{}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Table",
    data() {
      return{
        players: [
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", active: false}
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
      addPlayersData(name, seat, token){
        let counter = seat-1;
        this.players[counter].name = name;
        this.players[counter].seat = seat;
        this.players[counter].token = token;
        this.players[counter].active = true;
        this.event = !this.event;
        document.getElementsByClassName("player")[counter].style = "display: flexbox";
        this.$root.$emit("subscribePlayer", token)
      },
    },
    mounted(){
      this.$root.$on("addPlayer", (playerName, playerNumber, playerToken) => this.addPlayersData(playerName, playerNumber, playerToken));
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