<template>
  <div>{{table_state}}</div>
</template>

<script>
import gql from 'graphql-tag';

const SUBSCRIBE_TO_SERVER = gql`
subscription {
  subscribe{
    communityCards{
      rank,
      suit
    },
    players{
      name
      stack
      seat
    }
  }
} `;


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
        result ({data}) {
          // Let's update the local data
            console.log(data);
          this.table_state = data.subscribe;
          this.$store.state.playersNumber = data.subscribe.players.length;
          this.$store.state.playersNumber = data.subscribe.players.length;

        },
      }
    },

  },
}

</script>

<style scoped>

</style>