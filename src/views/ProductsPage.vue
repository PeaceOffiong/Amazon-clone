<template>
  <Navbar />
  <Suspense>
  <template #default>
      <ProductS/>
    </template>
    <template #fallback>
      <h3>Loading</h3>
    </template>
  </Suspense>


  <!-- <div>
    <div class="loading" v-if="loading">Loading</div>
    <div
      class="products"
      v-for="product in data.products"
      :key="product.id"
      v-else>
      <h2>{{ product.title }}</h2>
    </div>
  </div> -->
</template>

<script setup>
/* eslint-disable */
import Navbar from "../components/navBar.vue";
import ProductS from "../components/productS.vue";
</script>
<style></style>
