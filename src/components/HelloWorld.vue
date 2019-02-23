<template>
  <div class="hello" ref="app">
    <h2>Infinite Scroll Unsplash Code Challenge</h2>
    <div class="container">
      <ImagePack
        v-for="(images, i) in dataToRender"
        :images="images"
        :key="i"
      />
      <Spinner />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import ImagePack from './ImagePack';
import Spinner from './Spinner';

const apiUrl = 'https://api.unsplash.com';
const count = 6;
const accessKey =
  '9a3bbae53c612d4f49421b74e3206dc26f80d04b2dc0bf7004bce0e3f1971543';
const apiEndPoint = `${apiUrl}/photos/random?client_id=${accessKey}&count=${count}`;

export default {
  name: 'HelloWorld',
  components: {
    ImagePack,
    Spinner
  },
  data() {
    return {
      images: null,
      dataToRender: [],
      isOk: null
    };
  },
  destroyed: function() {
    window.removeEventListener('scroll', this.scrol);
  },
  mounted() {
    this.getImages();
    setTimeout(() => {
      this.getImages();
    }, 500);
    window.addEventListener('scroll', _.debounce(this.scrol, 300));
  },
  methods: {
    scrol() {
      this.windowInnerHeight = window.innerHeight;
      this.documentHeight = window.document.documentElement.offsetHeight;
      this.fullScroll = this.documentHeight - this.windowInnerHeight;
      this.scrollY = window.scrollY;

      if (this.fullScroll - this.scrollY < 100) {
        this.getImages();
      }
    },
    getImages() {
      if (!this.isOk) {
        this.isOk = true;
        setTimeout(() => {
          this.isOk = null;
        }, 499);
      }

      axios
        .get(apiEndPoint)
        .then(res => {
          const imagesPack = res.data.map(image => ({
            description: image.description,
            urls: image.urls
          }));
          this.dataToRender.push(imagesPack);
        })
        .catch(err => console.log(err));
    }
    // showServer() {
    //   console.log(ServerStore.get());
    //   ServerStore.set({
    //     url: 'http://hahahahmamyto.com',
    //     key: 'OżeszWdupe'
    //   })
    // }
  }
};
</script>

<style scoped lang="scss">
h2 {
  margin: 20px 0 0;
}
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 912px;
  margin: 10px auto;
}
</style>
