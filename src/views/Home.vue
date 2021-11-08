<template>
  <div>
    <slider :data="images" />
    <TitleFunc level="1"></TitleFunc>
    <slider-translate :data="images" />
    <carousel-perspective />
    <transform-slider :list="images" />
  </div>
</template>

<script>
import CarouselPerspective from "../components/CarouselPerspective.vue"
import TransformSlider from "../components/transformSlider.vue"
import Slider from "../components/Slider.vue"
import SliderTranslate from "../components/sliderTranslate.vue"
import TitleFunc from "../components/TitleFunc"
export default {
  components: {
    Slider,
    TitleFunc,
    SliderTranslate,
    CarouselPerspective,
    TransformSlider,
  },
  setup() {
    const images = [
      {
        id: 23,
        img: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1461&q=80",
      },
      {
        id: 842,
        img: "https://images.unsplash.com/photo-1431411207774-da3c7311b5e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: 96,
        img: "https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80",
      },
      {
        id: 93,
        img: "https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      },
      {
        id: 2365,
        img: "https://images.unsplash.com/photo-1482754503089-14d1faac718a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      },
    ]
    return {
      images,
    }
  },
}
</script>

<style></style>
