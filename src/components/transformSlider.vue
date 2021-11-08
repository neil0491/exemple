<template>
  <div class="wrapper">
    <!-- {{ newList }} -->
    <div class="carousel">
      <div class="inner" ref="inner" :style="innerStyles">
        <div
          :class="[{ first: index == 0 }, { last: index == cards.length - 1 }]"
          class="slide"
          v-for="(item, index) in cards"
          :key="item.id"
        >
          <img :src="item.img" />
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <button @click="prev()">Prev</button>
    <button @click="next()">Next</button>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue"
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const inner = ref(null)
    const cards = ref(props.list ?? [])
    const innerStyles = ref({})
    let step = ""
    let transitioning = false

    const setStep = () => {
      const innerWidth = inner.value.scrollWidth
      const totalCards = cards.value.length
      console.log(innerWidth)
      console.log(totalCards)

      step = `${innerWidth / totalCards}px`
      console.log(step)
    }

    const next = () => {
      if (transitioning) return
      transitioning = true
      moveLeft()
      afterTransition(() => {
        console.log("next")
        const card = cards.value.shift()
        cards.value.push(card)
        resetTranslate()
        transitioning = false
      })
    }

    const prev = () => {
      if (transitioning) return
      transitioning = true
      console.log("prev")
      moveRight()
      afterTransition(() => {
        const card = cards.value.pop()
        cards.value.unshift(card)
        resetTranslate()
        transitioning = false
      })
    }

    const moveLeft = () => {
      innerStyles.value = {
        transform: `translateX(-${step})
                    translateX(-${step})`,
      }
    }
    const moveRight = () => {
      innerStyles.value = {
        transform: `translateX(${step})
                    translateX(-${step})`,
      }
    }

    const afterTransition = (callback) => {
      const listener = () => {
        callback()
        inner.value.removeEventListener("transitionend", listener)
      }
      inner.value.addEventListener("transitionend", listener)
    }

    const resetTranslate = () => {
      console.log(innerStyles.value)
      innerStyles.value = {
        transition: "none",
        transform: `translateX(-${step})`,
      }
    }
    onMounted(() => {
      setStep()
      resetTranslate()
      window.addEventListener("resize", setStep)
    })
    onBeforeMount(() => {
      window.removeEventListener("resize", setStep)
    })

    return {
      inner,
      cards,
      innerStyles,
      cards,
      next,
      prev,
    }
  },
}
</script>

<style scoped>
button {
  margin-top: 2rem;
}
.wrapper {
  margin: 3rem 0;
  height: 100%;
}
.carousel {
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  /* transform-style: preserve-3d; */
}
.inner {
  /* position: absolute; */
  /* perspective: 600px; */
  display: flex;
  flex-wrap: nowrap;
  transition: all 0.5s;
}
.slide {
  /* width: 400px; */
  /* margin-right: 10px; */
  /* display: inline-flex; */
  flex: 0 0 50%;
  transition: all 0.5s;

  /* margin: 0 1rem; */
}
.slide:nth-child(1) {
  /* transform: rotateY(0deg) translateZ(100px); */
  /* transform: translateZ(-80px) translate(-86px) rotateY(40deg); */
}
.slide:nth-child(2) {
  /* transform: rotateY(0deg) translateZ(100px); */

  /* transform: translateZ(80px); */
}
.slide:nth-child(3) {
  /* transform: translateZ(100px) rotateY(20deg); */
}
.slide:nth-child(1),
.slide:nth-child(1),
.first {
  /* width: 0; */
  /* transform: translateX(-100%); */
  /* flex: 0; */
}
.last {
  /* width: 0; */
  /* transform: translateX(-100%); */
  /* flex: 0; */
}
</style>
