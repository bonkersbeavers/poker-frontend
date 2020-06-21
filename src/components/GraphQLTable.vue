<template>
  <div>{{table_state}}</div>
</template>

<script>
import gql from 'graphql-tag';

const CREATE_TABLE = gql`
mutation createTable {
  createTable(settings: {jsonSettings: """{
    'seatsNumber': 5,
    'defaultStack': 1000,
    'blinds': {
      'smallBlind': 10,
      'bigBlind': 20
    },
    'playerActionTime': -1,
    'dealerActionTime': 3000,
    'newHandTime': 8000
  }"""}){
    code
    message
  }
}
`;

// const SUBSCRIBE_TO_SERVER = gql`
// subscription subscribePlayer($token: String!) {
//   subscribe(request: { playerToken: $token }) {
//     table {
//       players {
//         seat
//         name
//         stack
//         cards {
//           suit
//           rank
//           isHidden
//         }
//         lastAction
//         currentBet
//       }
//     }
//   }
// }
//  `;


export default {
  data() {
    return {
      playerToken: "",
      table_state: []
    };
  },
  methods: {
    createTable(){
      this.$apollo.mutate({
        mutation: CREATE_TABLE,
        update: (store, { data:{ createTable} }) => {
          if(createTable.code !== "OK")
            console.log(createTable);
          else
            console.log(createTable)
        }
      })
    }
  },
  mounted() {
    this.createTable();
    this.$root.$on("subscribePlayer", token => this.playerToken = token);
    console.log(this.playerToken)
  },
  // apollo: {
  //   $subscribe: {
  //     table_state: {
  //       query: SUBSCRIBE_TO_SERVER,
  //       variables: {
  //         token: this.playerToken
  //       },
  //       result(data) {
  //         // Let's update the local data
  //         console.log(data);
  //         this.table_state = data.subscribe;
  //         this.$store.state.playersNumber = data.subscribe.players.length;
  //       },
  //     }
  //   }
  // }
}

</script>

<style scoped>

</style>