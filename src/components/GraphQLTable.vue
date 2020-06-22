<template>
  <div></div>
</template>

<script>
import gql from 'graphql-tag';

const CREATE_TABLE = gql`
mutation createTable {
  createTable(settings: {jsonSettings: """{
    'seatsNumber': 7,
    'defaultStack': 1000,
    'blinds': {
      'smallBlind': 10,
      'bigBlind': 20
    },
    'playerActionTime': -1,
    'dealerActionTime': 3000,
    'newHandTime': 8000
  }"""}){
    code
    message
  }
}
`;

export default {
  data() {
    return {
      playerToken: "",
    };
  },
  methods: {
    createTable(){
      this.$apollo.mutate({
        mutation: CREATE_TABLE,
        update: (store, { data:{ createTable} }) => {
          if(createTable.code !== "OK")
            console.log(createTable.message);
        }
      })
    },
  },
  mounted() {
    this.createTable();
    this.$root.$on("subscribePlayer", token => this.playerToken = token);
  }
}

</script>

<style scoped>

</style>