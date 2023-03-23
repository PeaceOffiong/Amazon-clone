<template>
  <CategoriesNav :data="data" @fetchCategory="fetchCategory($event)" />

  <div class="productsContainer">
      <div class="products" v-for="product in data" :key="product.id">
    <div class="productContainer">
      <router-link :to="'/product/' + product.id" class="link">
        <img :src="product.images[0]" :alt="product.title"  class="image"/>
        <div class="mini-details">
          <h4 class="title">
            {{ product.title
            }}<span>
              -
              <p class="description">
                {{ product.description }}
              </p></span
            >
          </h4>
          <p class="rating">{{ product.rating }}</p>
          <span>
            <h2 class="price">${{ product.price }}</h2>
            <small class="discountpercentage">
              ({{ product.discountPercentage }} % discount)
            </small>
          </span>
        </div>
      </router-link>
    </div>
  </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { useFetch } from "../composables/Fetch";
import CategoriesNav from "../components/CategoriesNav.vue";
import { ref } from "vue";


//set states
const data = ref([]);
const loading = ref(true);

//function to get data
const getData = async () => {
  try {
    const products = await fetch("https://dummyjson.com/products");
    const response = await products.json();
    data.value = response.products;
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

await getData();

//function to update endpoint based on category
const fetchCategory = async (event) => {
  loading.value = true;
  const { products, load, error, getData } = await useFetch(
    `https://dummyjson.com/products/category/${event}`
  );

  if (products) {
    data.value = products;
    loading.value = load.value;
  }
};
</script>

<style>


.productsContainer {
  display: flex;
  align-items:center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
}


.productContainer{
  height: 500px;
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 12px 0px -6px rgba(242,240,240,0.75);
  border: 1px groove rgba(242,240,240,0.75);
} 

.link{
  height: 500px;
  width:inherit;
}

.image{
  height: 50%;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.mini-details{
  height: 50%;
  border-top: 1px groove rgba(238, 233, 233, 0.75);
  background-color: rgb(251, 251, 251);
}


</style>
