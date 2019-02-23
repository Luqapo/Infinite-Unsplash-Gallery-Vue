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

import { store } from '../services/Es6Store.js';

export default {
  name: 'server-store',
  data() {
    return {
      server: null
    };
  },
  created() {
    // store.set({
    //   url: 'http://localhost:8080/events',
    //   key: 'Saadfhskdfhwferihvsvscz'
    // });
    console.log(store.get());
    this.server = store.get();
  },
  methods: {
    getUrl() {
      console.log(store.get());
      this.server = store.get();
    },
    setNew() {
      store.set({
        url: 'http://awascloud.com/booster',
        key: 'Sajksudiohfkvnd,vndx'
      });
    },
    fetchData() {
      axios
        .get(this.server.url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Barear ${this.server.key}`
          }
        })
        .catch(err => alert(err));
    }
  }
};
</script>
