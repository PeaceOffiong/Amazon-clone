<template>
  <article class="container" v-if="loading">
  loading
  </article>

  <article class="container" v-else-if="error">
    {{ error }}
  </article>

  <article class="container" v-else>
  <small>{{ alertMessage }}</small>
    <aside class="img-area">
      <div class="largeImg">
        <img :src="product.images[0]" :alt="product.title" />
      </div>
      <div
        class="minidisplays"
        v-for="(image, index) in product.images"
        :key="index"
      >
        <img :src="image" :alt="product.title" />
      </div>
    </aside>

    <aside class="product-details">
      <h3>{{ product.title }}, {{ product.description }}</h3>
      <p>Rating: {{ product.rating }}</p>
      <p>Brand: {{ product.brand }}</p>
      <p>Stock: {{ product.stock }}</p>
      <div class="underline"></div>
      <div class="price">
      <small>$</small>
        <h3>
          {{ product.price }} Discounted at {{ product.discountPercentage }}
        </h3>
      </div>
    </aside>
    <aside class="options">
    <div class="price">
      <small>$</small>
        <h3>
          {{ product.price }} Discounted at {{ product.discountPercentage }}
        </h3>
      </div>
      <div class="quantity">
        <select name="quantity" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        </select>
      </div>
      <div class="btn-container">
      <button @click="handleAddToCart">Add to Cart</button>
      <button>Buy Now</button>
      </div>
    </aside>
  </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, defineProps, defineEmits } from "vue";

//define Props
const props = defineProps({
    cartItems: {
        type: Array,
        required:true,
    }
})
//emit
const emit = defineEmits(['updatecartItems']);

//state
const product = ref({});
const loading = ref(true);
const error = ref("");
const alertMessage = ref(""); 
const cart = ref(props.cartItems); 

//get route
const route = useRoute();

const fetchProduct = () => {
  const param = route.params.id;
  const endPoint = `https://dummyjson.com/products/${param}`;

  fetch(endPoint)
    .then((response) => response.json())
    .then((json) => (product.value = json))
    .catch((err) => (error.value = err))
    .finally(() => (loading.value = false));
};

onMounted(() => {
  fetchProduct();
});

const handleAddToCart = () => {
    alertMessage.value = "Item Sucessfully added in cart"
    setTimeout(() => {
        alertMessage.value = ""
    }, 3000);
    cart.value.push(product);
    emit('updatecartItems', cart.value)
}

</script>
<style></style>
