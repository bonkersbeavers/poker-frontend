<template>
  <div class="table">
    <div class="player" :style="style(player.active)" v-for="(player,index) in players" :key="index">
      PLAYER {{ player.seat }}: {{ player.name }}
      <br>CARDS
      <p>{{ player.cards[0]}}</p>
      <p>{{ player.cards[1]}}</p>
      <br>STACK: {{ player.stack }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const SUBSCRIBE_TO_SERVER = gql`
subscription subscribePlayer($token: String!) {
  subscribe(request: { playerToken: $token }) {
        table {
      players {
        seat
        name
        stack
        cards {
          suit
          rank
          isHidden
        }
        lastAction
        currentBet
      }
      communityCards {
        suit
        rank
      }
      pots
      blinds {
        smallBlind
        bigBlind
      }
      positions {
        button
        smallBlind
        bigBlind
      }
      activePlayerSeat
    }
    actionToken
    possibleActions {
      actionType
      chips
    }
  }
}
 `;
  
  export default {
    name: "Table",
    data() {
      return{
        table_state: [],
        players: [
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
          {name:"", seat: 0, color: "#f9f39f", token:"", cards: [], stack: 0, active: false},
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
        this.subscribePlayer(seat, token, counter)
      },
      subscribePlayer(seat, token, counter){
        this.$apollo.subscribe({
          query: SUBSCRIBE_TO_SERVER,
          variables: {
            token: token
          }
        }).subscribe(({ data }) => {
          this.players[counter].stack = data.subscribe.table.players[counter].stack;
          data.subscribe.table.players[counter].cards.forEach( (card, index) => {
            this.players[counter].cards[index] = card.rank + " OF " + card.suit;
          });
          if(data.subscribe.actionToken)
            this.$root.$emit("takeAction", data.subscribe.actionToken, data.subscribe.possibleActions, counter+1)
        })
      }
    },
    mounted(){
      this.$root.$on("addPlayer", (playerName, playerSeat, playerToken) => this.addPlayersData(playerName, playerSeat, playerToken))
    }
  }
</script>

<style scoped>
  .table {
    background-image: url("../../public/table.svg");
    background-repeat: no-repeat;
    background-position: center;
    width:60%;
    height: 60%;
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
    border: 1px blue solid;
    color: yellow;
  }
</style>