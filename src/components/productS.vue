<template>
    <CategoriesNav :data="data" @fetchCategory="fetchCategory($event)" />
      <div
      class="products"
      v-for="product in data"
      :key="product.id">
      <h2>{{ product}}</h2>
    </div>
</template>
<script setup>
/* eslint-disable */
import { useFetch } from "../composables/Fetch";
import CategoriesNav from "../components/CategoriesNav.vue";
import { ref, onBeforeMount } from "vue";

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

await getData();

//function to update endpoint based on category
const fetchCategory = async(event) => {
  loading.value = true;
  const { products, load, error, getData } = await useFetch(`https://dummyjson.com/products/category/${event}`)

  if (products) {
    data.value = products;
    loading.value = load.value;
  }
};

</script>

<style></style>
