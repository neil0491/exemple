<template>
  <div class="scene">
    <div ref="carousel" class="carousel">
      <div
        v-for="(item, index) in cellCount"
        :key="index"
        class="carousel__cell reflection"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
  <p style="text-align: center; margin-bottom: 5rem">
    <button @click="prev" class="previous-button">Previous</button>
    <button @click="next" class="next-button">Next</button>
  </p>
</template>

<script>
import { onMounted, ref } from "vue"
export default {
  setup() {
    const carousel = ref(null)
    var cellCount = 12
    var selectedIndex = 0
    var radius, theta

    function rotateCarousel() {
      var angle = theta * selectedIndex * -1
      carousel.value.style.transform =
        "translateZ(" + -radius + "px) rotateY(" + angle + "deg)"
    }

    let cells
    let cellWidth = 300
    onMounted(() => {
      cells = carousel.value.querySelectorAll(".carousel__cell")
      changeCarousel()
    })
    function changeCarousel() {
      theta = 360 / cellCount
      var cellSize = cellWidth
      radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount))
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i]
        if (i < cellCount) {
          // visible cell
          cell.style.opacity = 1
          var cellAngle = theta * i
          cell.style.transform =
            "rotateY(" + cellAngle + "deg) translateZ(" + radius + "px)"
        } else {
          // hidden cell
          cell.style.opacity = 0
          cell.style.transform = "none"
        }
      }
      rotateCarousel()
    }

    const next = () => {
      selectedIndex++
      rotateCarousel()
    }
    const prev = () => {
      selectedIndex--
      rotateCarousel()
    }
    return { carousel, cellCount, next, prev }
  },
}
</script>

<style scoped>
.scene {
  margin: 5rem auto;
  width: 300px;
  height: 140px;
  position: relative;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  /* transform: translateZ(-288px); */
  transition: transform 1s;
}

.carousel__cell {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reflection {
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.5, transparent), to(white));
}
/* .carousel__cell:nth-child(1) {
  transform: rotateY(0deg);
}
.carousel__cell:nth-child(2) {
  transform: rotateY(40deg);
}
.carousel__cell:nth-child(3) {
  transform: rotateY(80deg);
}
.carousel__cell:nth-child(4) {
  transform: rotateY(120deg);
}
.carousel__cell:nth-child(5) {
  transform: rotateY(160deg);
}
.carousel__cell:nth-child(6) {
  transform: rotateY(200deg);
}
.carousel__cell:nth-child(7) {
  transform: rotateY(240deg);
}
.carousel__cell:nth-child(8) {
  transform: rotateY(280deg);
}
.carousel__cell:nth-child(9) {
  transform: rotateY(320deg);
} */
/* .carousel__cell:nth-child(1) {
  transform: rotateY(0deg) translateZ(288px);
}
.carousel__cell:nth-child(2) {
  transform: rotateY(40deg) translateZ(288px);
}
.carousel__cell:nth-child(3) {
  transform: rotateY(80deg) translateZ(288px);
}
.carousel__cell:nth-child(4) {
  transform: rotateY(120deg) translateZ(288px);
}
.carousel__cell:nth-child(5) {
  transform: rotateY(160deg) translateZ(288px);
}
.carousel__cell:nth-child(6) {
  transform: rotateY(200deg) translateZ(288px);
}
.carousel__cell:nth-child(7) {
  transform: rotateY(240deg) translateZ(288px);
}
.carousel__cell:nth-child(8) {
  transform: rotateY(280deg) translateZ(288px);
}
.carousel__cell:nth-child(9) {
  transform: rotateY(320deg) translateZ(288px);
} */

.carousel__cell:nth-child(9n + 1) {
  background: hsla(0, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 2) {
  background: hsla(40, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 3) {
  background: hsla(80, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 4) {
  background: hsla(120, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 5) {
  background: hsla(160, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 6) {
  background: hsla(200, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 7) {
  background: hsla(240, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 8) {
  background: hsla(280, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 0) {
  background: hsla(320, 100%, 50%, 0.8);
}
</style>
