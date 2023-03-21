<template>
  <Suspense>
    <template #default>
      <ProductS />
    </template>
    <template #fallback>
      <h3>Loading</h3>
    </template>
  </Suspense>
</template>

<script setup>
// import Navbar from "../components/navBar.vue";
import ProductS from "../components/productS.vue";
</script>
<style></style>
