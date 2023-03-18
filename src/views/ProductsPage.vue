<template>
<Navbar/>
<CategoriesNav :data="data" @fetchCategory="fetchCategory($event)"/>

<div>
     <div class="loading" v-if="loading">Loading</div> 
    <div class="products"  v-for="product in data.products" :key= "product.id" v-else>
        <h2>{{product.title}}</h2>
    </div> 
</div>

</template>

<script setup>
import Navbar from "../components/navBar.vue"
import { useFetch } from "../Fetch";
import CategoriesNav from "../components/CategoriesNav.vue";
import { ref , onMounted} from "vue";


const productsOnDisplay = ref([]);

 //use Fetch Composable to get all products
const { data, loading } = useFetch("https://dummyjson.com/products")

onMounted(() => {
    productsOnDisplay.value = data;
    console.log(productsOnDisplay);
    console.log(loading);
})

const fetchCategory = (event) => {
    console.log(event);
    // const { data } = useFetch(`https://dummyjson.com/products/category/${event}`)
}


</script>
<style>
</style> 