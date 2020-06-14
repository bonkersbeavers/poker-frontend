import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import VueApollo from "vue-apollo";

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use(VueApollo);

Vue.config.productionTip = false;

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8081/graphql/',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
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