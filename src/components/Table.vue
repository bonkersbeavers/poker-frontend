<template>
  <div class="table">
    <img src="../../public/table.svg">
  </div>
</template>

<script>
// import Player from "./Player";
export default {
  name: "Table",
  methods: {
    addPlayer(){

    }
  },
  mounted(){
    this.$root.$on("addPlayer", () => this.addPlayer());
  }
}

</script>

<style scoped>
.table {
  width: 500px;
  height: 250px;
  align-self: center;
}
</style>