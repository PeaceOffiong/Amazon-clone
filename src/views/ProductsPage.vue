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
import ProductS from "../components/productS.vue";
</script>
<style></style>
