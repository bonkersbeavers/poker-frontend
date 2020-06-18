<template>
  <div>{{table_state}}</div>
</template>

<script>
import gql from 'graphql-tag';

const SUBSCRIBE_TO_SERVER = gql`
subscription {
  subscribe(request: { playerToken: "f3dba237-70e5-4729-8399-f123183dff5f" }) {
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
    }
  }
}
 `;


export default {
  data() {
    return {
      echo: [],
      table_state: []
    };
  },
  mounted() {

  },
  apollo: {
    $subscribe: {
      table_state: {
        query: SUBSCRIBE_TO_SERVER,
        result (data) {
          // Let's update the local data
            console.log(data);
          this.table_state = data.subscribe;
          this.$store.state.playersNumber = data.subscribe.players.length;
        },
      }
    },

  },
}

</script>

<style scoped>

</style>