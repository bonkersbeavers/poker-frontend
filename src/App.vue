<template>
  <div id="app">
    <LobbyDashboard></LobbyDashboard>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:1000;
}

  html, body {
    margin: 0;
    height: 100%;
}

</style>
<script>
// import gql from 'graphql-tag';

import LobbyDashboard from "./components/LobbyDashboard";
//
// const START_DEFAULT_GAME = gql`
// mutation createTable {
//   createTable(settings: {jsonSettings: """{
//     'seatsNumber': 5,
//     'defaultStack': 1000,
//     'blinds': {
//       'smallBlind': 10,
//       'bigBlind': 20
//     },
//     'playerActionTime': -1,
//     'dealerActionTime': 3000,
//     'newHandTime': 8000
//   }"""}){
//     code
//     message
//   }
// }
// `;

export default {
  components: {LobbyDashboard},
  // created() {
  //   this.$apollo.mutate({
  //     mutation: START_DEFAULT_GAME,
  //     result ({data}) {
  //       console.log(data)
  //     }
  //   })
  // }
}
</script>