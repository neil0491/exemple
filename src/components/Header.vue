<template>
  <header class="header">
    <nav class="nav">
      <router-link
        v-for="(category, index) in categories"
        :key="index"
        class="nav__link"
        :to="category.slug"
      >
        {{ category.name }}
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  setup() {
    const categories = [
      {
        slug: '/',
        name: 'Главная',
      },
      {
        slug: '/movies',
        name: 'Фильмы',
      },
      {
        slug: '/func',
        name: 'Функции',
      },
      {
        slug: '/picker',
        name: 'Picker',
      },
    ];
    return {
      categories,
    };
  },
};
</script>

<style scoped>
.header {
  height: 100px;
}
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
a {
  text-decoration: none;
  font-weight: 500;
  color: blue;
}
.router-link-exact-active {
  font-weight: 600;
}
</style>
