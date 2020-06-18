import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import VueApollo from "vue-apollo";

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory'
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";


Vue.use(VueApollo);

Vue.config.productionTip = false;

const httpLink = createHttpLink({
  uri: 'http://localhost:9001/graphql/',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:9001/graphql/`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
});

const apolloProvider = new VueApollo({
    defaultClient: client,
});

new Vue({
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
