<template>
  <div class="background">
    <NavBar></NavBar>
    <Table></Table>
    <GraphQL></GraphQL>
  </div>
</template>

<script>
  import Table from "./Table";
  import GraphQL from "./GraphQL";
  import NavBar from "./NavBar";
  export default {
      name: "LobbyDashboard",
      components: {NavBar, Table, GraphQL}

  }
</script>

<style scoped>
.background{
  height: 100%;
  width: 100%;
  background-color: green;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
</style>