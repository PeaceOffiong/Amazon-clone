<template>
  <Navbar />
  <ProductsPage v-if="isHomePage" />
  <RouterView />
</template>

<script setup>
import Navbar from "../components/navBar.vue";
import ProductsPage from "./ProductsPage.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isHomePage = computed(() => route.path === "/");

console.log(isHomePage);
</script>
