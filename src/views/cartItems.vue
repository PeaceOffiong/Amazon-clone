<template>
  <h1>{{ cartList }}</h1>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  cartItems: {
    type: Array,
  },
});

const cartList = ref(props.cartItems);
</script>

<style></style>
