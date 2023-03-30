<template>
  <Navbar />
  <ProductsPage v-if="isHomePage" @updatecartItems="handleUpdate($newCartList)"/>
  <RouterView :cartItems ="cartItems" />
</template>

<script setup>
import Navbar from "../components/navBar.vue";
import ProductsPage from "./ProductsPage.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();

const isHomePage = computed(() => route.path === "/");

const cartItems = ref([]);

const handleUpdate = (newCartList) => {
  cartItems.value = newCartList;
}

</script>
