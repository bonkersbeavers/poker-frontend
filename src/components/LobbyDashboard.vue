<template>
  <div class="background">
    <NavBar></NavBar>
    <Table></Table>
    <GraphQLTable></GraphQLTable>
  </div>
</template>

<script>
  import Table from "./Table";
  import NavBar from "./NavBar";
  import GraphQLTable from "./GraphQLTable";
  export default {
      name: "LobbyDashboard",
      components: { NavBar, Table, GraphQLTable}

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