<template>
  <article class="wrap" v-if="loading">loading</article>

  <article class="wrap" v-else-if="error">
    {{ error }}
  </article>

  <article class="container" v-else>
    <!-- <small>{{ alertMessage }}</small> -->
    <aside class="img-area">
      <div class="largeImg">
        <img
          :src="product.images[count]"
          :alt="product.title"
          class="displayedImg"
        />
      </div>
      <p>See Different Views Of The Product</p>
      <ul ref="parentComponent">
        <div v-for="(image, index) in product.images" :key="index" class="each" @click="handleSwitchPictures(index, $event)">
          <img :src="image" :alt="product.title" class="mini" />
        </div>
      </ul>
    </aside>

<aside class="others">
 <div class="product-details">
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
    </div>

    <div class="options">
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
    required: true,
  },
});
//emit
const emit = defineEmits(["updatecartItems"]);

//state
const count = ref(0);
const product = ref({});
const loading = ref(true);
const error = ref("");
const alertMessage = ref("");
const parentComponent = ref(null);
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
  alertMessage.value = "Item Sucessfully added in cart";
  setTimeout(() => {
    alertMessage.value = "";
  }, 3000);
  cart.value.push(product);
  emit("updatecartItems", cart.value);
};

const handleSwitchPictures = (index,) => {
  count.value = index;
  //get parent element to loop through the children elements and add class name active
  const children = Array.from(parentComponent.value.children)
  children.forEach((child, indx) => {
    if (child.firstElementChild.classList.contains("active")) {
      child.firstElementChild.classList.remove("active");
    }
    if (index == indx) {
      console.log(indx)
      console.log(child)
      console.log(child.firstElementChild)
      child.firstElementChild.classList.add("active");
    }
  })
};

</script>

<style scoped>
.mini.active{
  border: 2px solid orange;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  height:auto;
  /* justify-content: space-around; */
}

aside{
  flex: 1;
  height: auto;
}

.others{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  height:auto;
}
.img-area{
height: inherit;
}
.img-area.onMove{
  position: fixed;
  top: 0;
}
.options, .product-details, .img-area{
  max-width: 400px;
  flex: 1 1 260px;
  height: auto;
}
/* 
.product-details{
  height: 400px;
} */

.img-area p{
 text-align: center;
 padding-top: 15px;
}
.largeImg {
  height: 310px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.displayedImg {
  height: 100%;
  width: 100%;
  margin-top: 20px;
}

ul {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.mini {
  height: 45px;
  width: 45px;
  border: 2px solid rgb(108, 103, 103);
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
}
/* 
.product-details{
  flex: 1 1 auto;
  min-height: 100%;

}
.options{
  
} */


/* @media screen and (max-width: 698px) {
  .largeImg {
    height: 250px;
  }

  aside {
    max-width: 300px;
    flex: 1 1 260px;
    border: 2px solid rgb(117, 115, 115);
  }
} */
</style>
