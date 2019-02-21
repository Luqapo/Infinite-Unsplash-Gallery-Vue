<template>
  <div class="flex">
    <div class="image" v-for="(image, i) in images" :key="i">
      <img :src="image.urls.small" :alt="image.description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePack',
  props: {
    images: Array
  },
  methods: {
    addFile() {
      console.log('Im here!')
    },
    codingChallwnge() {
      console.log('Buuu')
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 912px;
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
