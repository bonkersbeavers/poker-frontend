<template>
  <div class="navBar">
    <p style="font-size: 50px">Players: {{ playerNumber }}</p>
    <button @click="addPlayer">Add player</button>
    <input class="mb2" type="text" placeholder="enter player's name" v-model="playerName">
    <button @click="resetGame">Reset game</button>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const ADD_PLAYER = gql`
mutation addPlayer($name: String!, $seat: Int!) {
  addPlayer(request: {playerName: $name, seat: $seat}){
    code
    message
    playerToken
  }
}`;

const RESET_GAME = gql`
mutation resetGame {
  reset{
    code
    message
  }
}
`;

export default {
  name: "NavBar",
  data(){
    return{
      playerNumber: 0,
      playerName: "",
      maxPlayers: 6
    }
  },
  methods: {
    addPlayer() {
      if(this.playerNumber < this.maxPlayers){
        this.playerNumber++;
        this.$apollo.mutate({
          mutation: ADD_PLAYER,
          variables: {
            name: this.playerName,
            seat: this.playerNumber
          },
          update: (store, { data:{addPlayer} }) => {
            if(addPlayer.code !== "OK")
              console.log(addPlayer.message);
            else
              this.$root.$emit("addPlayer", this.playerName, this.playerNumber, addPlayer.playerToken);
          }
        })
      }
      else{
          alert("No more room for another players.")
      }
    },
    resetGame(){
      this.$apollo.mutate({
        mutation: RESET_GAME,
        update: (store, { data:{ reset} }) => {
            if(reset.code)
              alert("Game reseted")
        }
      });
      window.location.reload(true)
    }
  },
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