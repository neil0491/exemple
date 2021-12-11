<template>
  <picker
    :wheel-speed="wheelSpeed"
    @update:modelValue="modelValue"
    :options="options"
    v-model="selections"
  />
</template>

<script>
import { ref } from '@vue/reactivity';
import picker from '../components/picker.vue';
export default {
  components: { picker },
  setup() {
    const wheelSpeed = ref(1);
    const selections = ref([]);
    const options = ref([
      [
        {
          id: 8,
          year: '2021',
        },
        {
          id: 1,
          year: '2020',
        },
        {
          id: 2,
          year: '2019',
        },
        {
          id: 3,
          year: '2018',
        },
        {
          id: 4,
          year: '2017',
        },
        {
          id: 5,
          year: '2016',
        },
        {
          id: 6,
          year: '2015',
        },
        {
          id: 7,
          year: '2014',
        },
        {
          id: 9,
          year: '1997',
        },
        {
          id: 10,
          year: '1992',
        },
        {
          id: 11,
          year: '1988',
        },
        {
          id: 12,
          year: '1986',
        },
        {
          id: 13,
          year: '1984',
        },
        {
          id: 14,
          year: '1982',
        },
        {
          id: 15,
          year: '1980',
        },
        {
          id: 16,
          year: '1978',
        },
        {
          id: 17,
          year: '1976',
        },
        {
          id: 18,
          year: '1974',
        },
        {
          id: 19,
          year: '1972',
        },
        {
          id: 20,
          year: '1968',
        },
      ],
    ]);

    const modelValue = (val) => {
      console.log(val);
      console.log(selections.value[0], 'selections');
    };
    return {
      modelValue,
      options,
      wheelSpeed,
      selections,
    };
  },
};
</script>

<style></style>
