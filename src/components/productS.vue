
<template>
    <CategoriesNav :data="data" @fetchCategory="fetchCategory($event)" />
      <div
      class="products"
      v-for="product in data"
      :key="product.id">
      <h2>{{ product.title }}</h2>
    </div>
</template>
<script setup>
/* eslint-disable */
// import { useFetch } from "../Fetch";
import CategoriesNav from "../components/CategoriesNav.vue";
import { ref } from "vue";

//set states
const data = ref([]);
const loading = ref(true);

//function to get data
const getData =  async() =>{
  try {
    const products = await fetch("https://dummyjson.com/products");
    const response = await products.json();
    data.value = response.products;
  } catch (error) {
    console.log(error.message)
  } finally{
    loading.value = false;
  }
}

console.log(data.value)

await getData();

//function to update endpoint based on category
const fetchCategory = (event) => {

  console.log(event);
};
</script>


<style></style>
