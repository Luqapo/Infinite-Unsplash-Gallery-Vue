<template>
  <div class="hello">
    <h2>Infinite Scroll Unsplash Code Challenge</h2>
    <div class="conatiner">
      <ImagePack
        v-for="(images, i) in dataToRender"
        :images="images"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ImagePack from "./ImagePack";
import { setTimeout } from "timers";

const apiUrl = "https://api.unsplash.com";
const count = 3;
const accessKey =
  "9a3bbae53c612d4f49421b74e3206dc26f80d04b2dc0bf7004bce0e3f1971543";
const apiEndPoint = `${apiUrl}/photos/random?client_id=${accessKey}&count=${count}`;

export default {
  name: "HelloWorld",
  components: {
    ImagePack
  },
  data() {
    return {
      images: null,
      dataToRender: []
    };
  },
  created() {
    this.getImages();
    setTimeout(this.getImages(), 1000);
    this.getImages();
    window.addEventListener("scroll", this.scorl);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    console.log(window);
  },
  methods: {
    scorl() {
      console.log("Przewijam", window.scrollY);
      console.log("Offset", window.innerHeight);
      const half = window.innerHeight / 2;
      if (half - window.scrollY < 10) {
        console.log("dodaje");
        this.getImages();
      }
    },
    getImages() {
      axios.get(apiEndPoint).then(res => {
        //console.log(res.data);
        const imagesPack = res.data.map(image => ({
          description: image.description,
          urls: image.urls
        }));
        this.dataToRender.push(imagesPack);
        console.log(this.dataToRender);
      });
    }
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
  max-width: 912px;
  margin: 10px auto;
}
</style>
