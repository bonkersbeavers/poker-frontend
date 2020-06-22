<template>
  <div class="navBar">
    <p class="notification">Players: {{ playerNumber }}</p>
    <button class="red button" @click="addPlayer">Add player</button>
    <input class="w3-input w3-border" type="text" placeholder="enter player's name" v-model="playerName">
    <button class="red button" @click="startGame">Start game</button>
    <button class="red button end" @click="resetGame">Reset game</button>
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

const START_GAME = gql`
mutation starGame {
  startGame{
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
      playerToken: "",
      maxPlayers: 6,

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
    },
    startGame(){
      this.$apollo.mutate({
        mutation: START_GAME,
        update: (store, { data: { startGame } }) => {
          if(startGame.code != "OK")
            alert(startGame.message)
        }
      });
    }
  },
}
</script>

<style scoped>
  .notification{
    font-size: 30px;
    color: white;
    margin-left: 5%
  }
  
  .button::-moz-focus-inner{
    border: 0;
    padding: 0;
  }
  
  .button{
    display: inline-block;
    *display: inline;
    zoom: 1;
    padding: 6px 20px;
    margin: 20px;
    cursor: pointer;
    border: 1px solid #bbb;
    overflow: visible;
    font: bold 13px arial, helvetica, sans-serif;
    text-decoration: none;
    white-space: nowrap;
    color: #555;
    width: 10%;
    height: 70%;
    background-position: center;
    font-size: 20px;
    background-color: #ddd;
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
    background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
    
    -webkit-transition: background-color .2s ease-out;
    -moz-transition: background-color .2s ease-out;
    -ms-transition: background-color .2s ease-out;
    -o-transition: background-color .2s ease-out;
    transition: background-color .2s ease-out;
    background-clip: padding-box; /* Fix bleeding */
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
    text-shadow: 0 1px 0 rgba(255,255,255, .9);
    
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .button:hover{
    background-color: #eee;
    color: #555;
  }
  
  .button:active{
    background: #e9e9e9;
    position: relative;
    top: 1px;
    text-shadow: none;
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  }
  
  .button[disabled], .button[disabled]:hover, .button[disabled]:active{
    border-color: #eaeaea;
    background: #fafafa;
    cursor: default;
    position: static;
    color: #999;
    /* Usually, !important should be avoided but here it's really needed :) */
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  .navBar{
    width: 100%;
    height: 10%;
    background-color: green;
    display: flex;
    align-items: center;
  }

  .button.red {
    color: #fff;
    text-shadow: 0 1px 0 rgba(0,0,0,.2);
  
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
    background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
    background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
    background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
    background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
    background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  }

  .button.red{
    background-color: #ca3535;
    border-color: #c43c35;
  }

  .button.red:hover{
    background-color: #ee5f5b;
  }

  .button.red:active{
    background: #c43c35;
  }
  
  .button.end{
    margin-left: 40%
  }
  /* */

</style>