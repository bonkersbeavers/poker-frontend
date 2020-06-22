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

import LobbyDashboard from "./components/LobbyDashboard";

export default {
  components: {LobbyDashboard},

}
</script>