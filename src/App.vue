<template>
  <div id="app">
    <LobbyDashboard></LobbyDashboard>
    <GraphQL></GraphQL>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
<script>
  import LobbyDashboard from "./components/LobbyDashboard";
  import GraphQL from "./components/GraphQL";
  export default {
    components: {GraphQL, LobbyDashboard},
  }
</script>