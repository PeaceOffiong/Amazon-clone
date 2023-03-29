<template>
  <p v-if="isLoading">Loading data...</p>
  <p v-else-if="error">Error fetching data: {{ error }}</p>
  <div v-else-if="data !== null">
    <CategoriesNav
      :data="data.products"
      @fetchCategoryData="fetchCategoryData($event)"
    />
    <div class="productsContainer">
      <div class="products" v-for="product in tempData.products" :key="product.id">
        <div class="productContainer">
          <router-link 
          :to="{
            name: 'productPage',
            params:{
              //since the api doesnt provide for distinctive ids in both category and all http request the only distinctive objectValue is the name
              name: product.title,
            }
          }" class="link">
            <img :src="product.images[0]" :alt="product.title" class="image"/>
            <div class="mini-details">
              <p class="title">
                {{ product.title }} - {{ product.description }}
              </p>
              <p class="rating">Rating {{ product.rating }}</p>
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
  </div>
</template>
<script setup>
// import { useFetchData } from "../composables/Fetch";
import CategoriesNav from "../components/CategoriesNav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
// import defaultImage from "../assets/defaultimg.png";


//set states
const data = ref(null);
const tempData = ref(null);
const isLoading = ref(false);
const error = ref(null);

//default image

async function fetchData(url) {
  isLoading.value = true;
  try {
    if (url === "https://dummyjson.com/products") {
      const response = await axios.get(url);
      data.value = response.data;
      tempData.value = response.data;
    } else {
      const response = await axios.get(url);
      tempData.value = response.data;
    }
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchData("https://dummyjson.com/products");
});

//function to update endpoint based on category
const fetchCategoryData = (event) => {
  if (event === "All") {
    tempData.value = data.value;
  } else {
    fetchData(`https://dummyjson.com/products/category/${event}`);
    console.log(event);
  }
};
</script>

<style>
.productsContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
}

.productContainer {
  height: 500px;
  width: 235px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 12px 0px -6px rgba(242, 240, 240, 0.75);
  border: 2px solid rgba(242, 240, 240, 0.75);
}

.link {
  height: 500px;
  width: inherit;
}

.image {
  height: 250px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.mini-details {
  height: 50%;
  border-top: 2px solid rgba(232, 226, 226, 0.75);
  background-color: rgba(0, 0, 0, 0.03);
  color: black;
  padding: 10px;
  line-height: 1.4em;
}
</style>
