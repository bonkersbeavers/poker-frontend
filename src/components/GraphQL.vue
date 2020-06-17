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
      table_state: []
    };
  },
  mounted() {

  },
  apollo: {
    echo: gql`query{echo(message:"sdasa")}`,
    // $subscribe: {
    //   table_state: {
    //     query: SUBSCRIBE_TO_SERVER,
    //     result ({data}) {
    //       // Let's update the local data
    //         console.log(data.data)
    //         console.log(data)
    //       this.table_state = data.data
    //     },
    //   }
    // },

  },
}

</script>

<style scoped>

</style>