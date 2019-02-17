<template>
  <div class="hello">
    <h2>Infinite Scroll Unsplash Code Challenge</h2>
    <div class="container">
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
import _ from "lodash";

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
      dataToRender: [],
      isOk: null
    };
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.scrol);
  },
  mounted() {
    this.getImages();
    setTimeout(() => {
      this.getImages();
    }, 500);
    window.addEventListener("scroll", _.debounce(this.scrol, 300));
  },
  methods: {
    scrol() {
      const windowInnerHeight = window.innerHeight;
      const documentHeight = window.document.documentElement.offsetHeight;
      const fullScroll = documentHeight - windowInnerHeight;

      if (fullScroll - window.scrollY < 100) {
        console.log("dodaje");
        this.getImages();
      }
    },
    getImages() {
      if (!this.isOk) {
        console.log("Laduje");
        this.isOk = true;
        setTimeout(() => {
          this.isOk = null;
        }, 499);
      }

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
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 912px;
  margin: 10px auto;
  height: 2000px;
}
</style>
