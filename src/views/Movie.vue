<template>
  <div>
    <template v-if="error === false">
      <div ref="inner">
        <div class="container-cards">
          <div class="card" v-for="(item, index) in list" :key="item.id">
            {{ index }}
            <div class="card__name">{{ item.name }}</div>
            <div class="card__img" v-if="item.image">
              <img :src="item.image" alt="" srcset="" />
            </div>
            <div class="card__status">{{ item.status }}</div>
            <div class="card__species">{{ item.species }}</div>
            <div class="card__link">
              <a :href="item.url">{{ item.url }}</a>
            </div>
          </div>
        </div>
      </div>
      <spinner v-if="showSpinner" />
    </template>
    <template v-else>
      <div>No data</div>
    </template>
  </div>
</template>

<script>
import { useInfiniteScroll } from "@/utils/infiniteScroll"
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue"
import spinner from "@/components/spinner.vue"

export default {
  components: { spinner },
  setup() {
    const inner = ref(null)
    const showSpinner = ref(true)
    const error = ref(false)

    const newsCount = ref(0)
    const currentPage = ref(1)
    const totalPage = ref(0)
    const list = ref([])
    const handleFetch = async (cb = () => {}) => {
      try {
        const data = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage.value}`
        )
        const result = await data.json()
        totalPage.value = await result.info["pages"]
        newsCount.value = await result.info["count"]
        list.value.push(...result.results)
        cb()
        console.log("fetch")
        console.log(result)
      } catch (error) {
        console.log(error)
        error.value = true
      } finally {
        currentPage.value++
      }
    }
    const scrollEnd = () => {
      // TODO How handle the end of news feed
      // e.g. hide spinner like in default page
      showSpinner.value = false
      console.log("end scroll")
    }
    const { startInfiniteScroll, loadData } = useInfiniteScroll({
      wrapper: inner,
      retrieve: (load, cb) => {
        handleFetch(cb)
      },
      newsCount: computed(() => newsCount.value),
      currentPage: computed(() => currentPage.value),
      pageSize: 1,
      scrollEnd,
    })
    onMounted(() => {
      handleFetch()
    })

    const refreshData = () => {
      startInfiniteScroll()
      loadData()
    }
    refreshData()

    // watch(() => refreshData())

    return {
      showSpinner,
      list,
      inner,
      error,
    }
  },
}
</script>

<style scoped>
.container-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
.card__name {
  text-align: center;
  padding: 1rem;
  background: lightgrey;
  color: #121212;
  font-weight: 600;
}
</style>
