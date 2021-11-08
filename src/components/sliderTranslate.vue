<template>
  <div class="scene" style="width: 100%">
    <div class="container">
      <div
        :class="index == 0 ? 'prev' : index === 1 ? 'active' : 'next'"
        class="img"
        v-for="(img, index) in slide"
        :key="img.id"
      >
        <img :src="img.img" alt="Img" />
      </div>
    </div>
    <button @click="handleChange(1)" class="control">next</button>
    <!-- <button @click="handleChange(-1)" class="control">prev</button> -->
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const slide = ref(JSON.parse(JSON.stringify(props.data)))

    const array_move = (index, array) => {
      let arr = slide.value.splice(0, index)
      array.push(...arr)
      return arr
    }
    const handleChange = (to = 1) => {
      array_move(to, slide.value)
    }
    return { handleChange, slide }
  },
}
</script>

<style scoped>
.scene {
}
.container {
  perspective: 500px;
  /* perspective-origin: left center; */
  margin: 0 auto;
  display: inline-flex;
  height: 300px;
  margin: 1rem auto;
  margin-bottom: 1rem;
  /* overflow: hidden; */
  position: relative;
}
.img {
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  flex: 0 0 300px;
  /* padding-left: 1rem; */
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* transform: translateZ(-288px); */

  /* transform: translateX(-100%); */
  /* transform: rotateY(60deg) translateZ(-10px); */
  transform-origin: center left;
}
.img:nth-child(1) {
  transform: rotateY(0deg);
}
.img:nth-child(2) {
  transform: rotateY(0deg) translateZ(0px);
}
.img:nth-child(3) {
  transform: rotateY(40deg) translateZ(-0px);
  left: 300px;
}
.img:nth-child(4) {
  transform: rotateY(40deg) translateZ(-40px) translateX(300px);
  left: 350px;
}
.img:nth-child(5) {
  transform: rotateY(44deg) translateZ(-0px) translateX(540px);
  left: 350px;

  opacity: 0;
}
.img:nth-child(6) {
  transform: rotateY(60deg) translateZ(-650px);
  opacity: 0;
}

button {
  width: 100%;
}
.prev {
  width: 0;
  flex: 0 0 0%;
  width: 0px;
  padding: 0;
  /* transform: translateX(-200%); */
}
.active {
  /* transform: translateX(-1rem); */
}

.next {
}
</style>
