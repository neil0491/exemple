<script setup>
import TitleFunc from '../components/TitleFunc';
import jsx from '../components/jsx';
</script>

<template>
  <TitleFunc level="2"> It's new Component </TitleFunc>
  <jsx />

  <div class="grid">
    <img src="https://unsplash.com/photos/fIq0tET6llw" alt="" srcset="" />
    <img
      src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      alt=""
      srcset=""
    />
    <img
      src="https://images.unsplash.com/photo-1491951931722-5a446214b4e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=767&q=80"
      alt=""
      srcset=""
    />
    <img
      src="https://images.unsplash.com/photo-1499914485622-a88fac536970?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt=""
      srcset=""
    />
    <img
      src="https://images.unsplash.com/photo-1544366194-cee6f995780f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1436&q=80"
      alt=""
      srcset=""
    />
    <img
      src="https://images.unsplash.com/photo-1556893289-5ccc75ebd2bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      alt=""
      srcset=""
    />
    <img
      src="https://images.unsplash.com/photo-1518982703581-5fddaa030272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"
      alt=""
      srcset=""
    />
  </div>
</template>

<style scoped>
.grid{
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-auto-rows: 150px; */
  grid-auto-flow: row dense;
}
</style>
