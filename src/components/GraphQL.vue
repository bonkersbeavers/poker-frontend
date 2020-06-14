<template>
  <div>{{echo}}</div>
</template>

<script>
import gql from 'graphql-tag';
//
// const SUBSCRIBE_TO_SERVER = gql`
// subscription {
//   subscribe{
//     communityCards{
//       rank,
//       suit
//     },
//     players{
//       name
//       stack
//       seat
//     }
//   }
// }
// `;

// const QUERY = gql`
// query{
//   echo(message:"sdasa")
// }`;

export default {
  data() {
    return {
      echo: [],
    };
  },
  mounted() {

  },
  apollo: {
    echo: gql`query{echo(message:"sdasa")}`
    // $subscribe: {
    //   subscription: {
    //     // graphql query
    //     query: SUBSCRIBE_TO_SERVER,
    //     result (data) {
    //       // Let's update the local data
    //         console.log(data)
    //       this.table_state = data.data.subscription
    //     },
    //   }
    // },

  },
}

</script>

<style scoped>

</style>