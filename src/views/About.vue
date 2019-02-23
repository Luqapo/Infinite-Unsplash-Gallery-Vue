<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUrl">{{ this.server ? this.server.url : null }}</button>
    <button @click="setNew">Change Server</button>
    <button @click="fetchData">Fetch DATA</button>
  </div>
</template>

<script>
import axios from 'axios';

import ServerStore from '../services/ServerStore.js';

export default {
  name: 'server-store',
  data() {
    return {
      server: null
    };
  },
  created() {
    ServerStore.set({
      url: 'http://localhost:8080/events',
      key: 'Saadfhskdfhwferihvsvscz'
    });
  },
  methods: {
    getUrl() {
      console.log(ServerStore.get());
      this.server = ServerStore.get();
    },
    setNew() {
      ServerStore.set({
        url: 'http://awascloud.com/booster',
        key: 'Sajksudiohfkvnd,vndx'
      });
    },
    fetchData() {
      axios
        .get(this.server.url, {
          headers: {
            Authorization: `Bearer ${this.server.key}`
          }
        })
        .catch(err => alert(err));
    }
  }
};
</script>
