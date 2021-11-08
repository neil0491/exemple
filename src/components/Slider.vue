<template>
  <div>
    <div class="container">
      <div class="img" v-for="img in data" :key="img.id">
        <transition
          :name="slideDirectionLeft ? 'slide-left' : 'slide-right'"
          appear
        >
          <img v-show="img.id == slide[0]?.id" :src="img.img" alt="Img" />
        </transition>
      </div>
    </div>
    <div class="pagination">
      <span
        :class="img.id == slide[0]?.id ? 'active' : ''"
        class="btn"
        v-for="img in data"
        :key="img?.id"
        @click="changeSlide(img?.id)"
        >{{ img?.id }}</span
      >
    </div>
    <button @click="changeSlide(1)" class="control">next</button>
    <button @click="changeSlide(-1)" class="control">prev</button>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  name: "Home",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const slideDirectionLeft = ref(true)
    const slide = ref(JSON.parse(JSON.stringify(props.data)))

    const getByUniqueComputed = (slug, list, fieldName, findIndex = false) => {
      if (findIndex) {
        return list.findIndex((elem) => elem[fieldName] === slug)
      }
      return list.find((elem) => elem[fieldName] === slug)
    }

    const array_move = (index, array) => {
      let arr = slide.value.splice(0, index)
      array.push(...arr)
      return array
    }

    const moveArrayItemToNewIndex = (arr, old_index, new_index) => {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
      return arr
    }

    const changeSlide = (index = 1) => {
      if (index == 1) {
        slideDirectionLeft.value = true
        slide.value = moveArrayItemToNewIndex(
          slide.value,
          0,
          slide.value.length - 1
        )
      } else if (index < 0) {
        slideDirectionLeft.value = false
        slide.value = moveArrayItemToNewIndex(
          slide.value,
          slide.value.length - 1,
          0
        )
      } else {
        slideDirectionLeft.value = true
        const realIndex = getByUniqueComputed(index, slide.value, "id", true)
        slide.value = array_move(realIndex, slide.value)
      }
    }
    return {
      slide,
      changeSlide,
      slideDirectionLeft,
    }
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.container {
  width: 80%;
  height: 500px;
  margin: 0 auto;
  position: relative;
  /* display: flex; */
  margin-bottom: 2rem;
  overflow: hidden;
}
.img {
  flex: 1 0 50%;
  max-width: 100%;
  padding: 0 1em;
  height: auto;
  /* margin: 0 1em; */
  /* opacity: 0.5; */
  position: relative;
}
.img img {
  position: absolute;
  width: 100%;
  height: 500px;
  top: 0;
  left: 0%;
  bottom: 0;
  right: 0;
}
.active-img {
  opacity: 1;
  transition: opacity 0.4 ease;
}
.control {
  padding: 0.5rem 1rem;
  margin: 0 1rem;
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 3rem;
  cursor: pointer;
  pointer-events: default;
}
.btn {
  margin: 0 2rem;
  background: cornflowerblue;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  text-align: center;
  line-height: 2em;
}
.active {
  background: chocolate;
}

.slide-left-enter-active {
  animation: fromRight 0.5s;
  transition: all 0.5s ease-out;
}
.slide-left-leave-active {
  animation: toLeft 0.5s;
  transition: all 0.5s ease-out;
}

.slide-right-enter-active {
  animation: fromLeft 0.5s;
  transition: all 0.5s ease-out;
}
.slide-right-leave-active {
  animation: toRight 0.5s;
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  transition: all 0.5s ease-out;
}
.slide-left-enter-from,
.slide-left-leave-to,
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
}

.slide-left-leave-from,
.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to {
  opacity: 1;
}

/* .move-sledet-move {
  transition: transform 0.8s ease;
} */
@keyframes toRight {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes toLeft {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes fromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes fromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
