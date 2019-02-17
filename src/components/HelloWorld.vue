<template>
  <div class="hello">
    <h2>Infinite Scroll Unsplash Code Challenge</h2>
    <div v-if="images" class="conatiner">
      <div class="image" v-for="(image, i) in images" :key="i">
        <img :src="image.urls.small" :alt="image.description" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const apiUrl = "https://api.unsplash.com";
const count = 5;
const accessKey =
  "9a3bbae53c612d4f49421b74e3206dc26f80d04b2dc0bf7004bce0e3f1971543";
const apiEndPoint = `${apiUrl}/photos/random?client_id=${accessKey}&count=${count}`;

export default {
  name: "HelloWorld",
  data() {
    return {
      images: null
    };
  },
  created() {
    axios.get(apiEndPoint).then(res => {
      //console.log(res.data);
      this.images = res.data.map(image => ({
        description: image.description,
        urls: image.urls
      }));
      console.log(this.images);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  margin: 20px 0 0;
}
.conatiner {
  display: flex;
  flex-wrap: wrap;
  max-width: 1124px;
  margin: 10px auto;
}
.image {
  max-width: 300px;
  align-self: auto;
  margin: 1% 2px;
  flex-grow: 1;
  vertical-align: middle;
  img {
    width: 100%;
  }
}
</style>
