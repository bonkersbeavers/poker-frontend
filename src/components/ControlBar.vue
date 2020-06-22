<template>
  <div class="btmBar">
    <p class="notification">Player's {{ playersTurn }} turn! </p>
    <button class="blue button" @click="takeActions('FOLD')" :disabled="this.possibleActions.FOLD">FOLD</button>
    <button class="blue button" @click="takeActions('CALL')" :disabled="this.possibleActions.CALL">CALL</button>
    <button class="blue button" @click="takeActions('CHECK')" :disabled="this.possibleActions.CHECK">CHECK</button>
    <button class="blue button" @click="takeActions('RAISE')" :disabled="this.possibleActions.RAISE">RAISE</button>
    <button  class="blue button" @click="takeActions('BET')" :disabled="this.possibleActions.BET">BET</button>
    <input class="mb2" type="text" placeholder="enter chips amount" v-model="chips">
    <p class="notification">Current bet: {{ this.bet }} </p>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const TAKE_ACTION = gql`
 mutation takeAction($actionToken: String!, $action: BettingActionType!, $chips: Int){
    takeAction(request: {
      actionToken: $actionToken
      action: $action
      chips: $chips
    }){
      message
      code
    }
  }`;

  export default {
    name: "ControlBar",
    data(){
      return {
        playersTurn: "",
        actionToken: "",
        bet: 20,
        chips: 0,
        possibleActions: {
          "FOLD": true,
          "CALL": true,
          "CHECK": true,
          "RAISE": true,
          "BET": true
        }
      }
    },
    methods: {
      updateControlBar(token, actions, playersTurn){
        this.actionToken = token;
        this.playersTurn = playersTurn;
        actions.filter( action => {
          if(action.actionType in this.possibleActions)
            this.possibleActions[String(action.actionType)] = false
        })
      },
      takeActions(action){
        this.$apollo.mutate({
          mutation: TAKE_ACTION,
          variables: {
            actionToken: this.actionToken,
            action: action,
            chips: Number(this.chips)
          }
        });
        if(action !== "BET" || action !== "RAISE")
          this.chips = 0;
        this.bet += Number(this.chips);
      },
    },
    mounted(){
      this.$root.$on("takeAction", (actionToken, possibleActions, playersTurn) => this.updateControlBar(actionToken, possibleActions, playersTurn))
    }
  }
</script>

<style scoped>
.btmBar{
  width: 100%;
  height: 10%;
  background-color: green;
  display: flex;
  justify-content: space-around;
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

.button.blue:disabled, .button.blue:disabled:hover, .button.blue:disabled:active{
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


.button.blue {
  color: #fff;
  text-shadow: 0 1px 0 rgba(0,0,0,.2);
  
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
}

.notification{
  font-size: 30px;
  color: white;
}

.button.blue{
  background-color: #269CE9;
  border-color: #269CE9;
}

.button.blue:hover{
  background-color: #70B9E8;
}


</style>