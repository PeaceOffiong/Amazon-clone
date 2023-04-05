<template>
  <article class="wrap" v-if="loading">loading</article>

  <article class="wrap" v-else-if="error">
    {{ error }}
  </article>

  <article v-else>
    <!-- <small>{{ alertMessage }}</small> -->
    <p class="backHome">
      <RouterLink to="/"> &#60; Back to results</RouterLink>
    </p>
    <article class="container">
      <aside class="img-area">
        <div class="scrolling" :class="stickImage ? 'onMove' : ''">
          <div class="largeImg">
            <img
              :src="product.images[count]"
              :alt="product.title"
              class="displayedImg"
            />
          </div>
          <p>See Different Views Of The Product</p>
          <ul ref="parentComponent">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="each"
              @click="handleSwitchPictures(index, $event)"
            >
              <img :src="image" :alt="product.title" class="mini" />
            </div>
          </ul>
        </div>
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
          <p class="char">
            $275.74 Shipping & Import Fees Deposit to Nigeria Details
          </p>
          <p class="char">
            Available at a lower price from other sellers that may not offer
            free Prime shipping.
          </p>
        </div>

        <div class="options">
          <div class="price">
            <small>$</small>
            <h3>
              {{ product.price }} Discounted at {{ product.discountPercentage }}
            </h3>
          </div>
          <p>
            $264.89 Shipping & Import Fees Deposit to Nigeria Details Delivery
            Friday, May 5
          </p>
          <p>
            Or fastest delivery Friday, April 14. Order within 11 hrs 21 mins
          </p>
          <div class="quantity">
            <label for="quantity">
              Qty
              <select name="quantity" id="" placeholder="Qty">
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
            </label>
          </div>
          <div class="btn-container">
            <button @click="handleAddToCart" class="addToCart">
              Add to Cart
            </button>
            <button class="buyNow">Buy Now</button>
          </div>
          <p><span class="bold">Payment:</span> Secure transaction</p>
          <p><span class="bold">Packaging:</span> Shows what's inside.</p>
          <div class="underline"></div>
          <p>
            Return policy: Eligible for Return, Refund or Replacement within 30
            days of receipt
          </p>
        </div>
      </aside>
    </article>
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
const stickImage = ref(false);

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

const onScroll = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 93 && window.innerWidth > 655) {
      stickImage.value = true;
    } else if (window.scrollY < 93 && window.innerWidth > 655) {
      stickImage.value = false;
    }
  });
};

onMounted(() => {
  fetchProduct();
  onScroll();
});

const handleAddToCart = () => {
  alertMessage.value = "Item Sucessfully added in cart";
  setTimeout(() => {
    alertMessage.value = "";
  }, 3000);
  cart.value.push(product);
  emit("updatecartItems", cart.value);
};

const handleSwitchPictures = (index) => {
  count.value = index;
  //get parent element to loop through the children elements and add class name active
  const children = Array.from(parentComponent.value.children);
  children.forEach((child, indx) => {
    if (child.firstElementChild.classList.contains("active")) {
      child.firstElementChild.classList.remove("active");
    }
    if (index == indx) {
      console.log(indx);
      console.log(child);
      console.log(child.firstElementChild);
      child.firstElementChild.classList.add("active");
    }
  });
};
</script>

<style scoped>
.onMove {
  position: fixed;
  top: 0;
  left: 50px;
}
select {
  border: 0;
  width: 30px;
  height: 20px;
  background-color: rgb(223, 222, 222);
}
label {
  font-size: 11px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 25px;
  background-color: rgb(223, 222, 222);
  cursor: pointer;
}
.addToCart {
  background-color: rgb(255, 220, 44);
}
.buyNow {
  background-color: orange;
}
.btn-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 90px;
  flex-direction: column;
}

.options .underline {
  width: 90%;
  margin: 0 10px;
}

button {
  height: 35px;
  width: 100%;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

.backHome {
  font-size: 12px;
  margin: 10px;
  color: black;
  height: 10px;
}
.options p,
.product-details p {
  font-size: 14px;
}

.options {
  max-width: 300px;
  border: 1px solid rgb(212, 207, 207);
  border-radius: 10px;
  align-self: flex-start;
}

.options .price,
.btn-container,
.options p,
.quantity {
  margin: 15px;
}

.options h3 {
  margin: 0;
  font-size: 21px;
  font-weight: 490;
}
.bold {
  font-weight: 600;
}
.price {
  display: flex;
}
.product-details {
  margin: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  min-width: 200px;
}

.product-details .price {
  margin-top: 10px;
}
.product-details h3 {
  margin: 0;
  font-size: 23px;
  font-weight: 490;
}
.underline {
  height: 1px;
  width: 100%;
  background-color: rgb(176, 167, 167);
}
.mini.active {
  border: 2px solid orange;
}
.container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  height: auto;
  position: relative;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

aside {
  flex: 1;
  height: auto;
  margin: 5px;
}

.others {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  height: auto;
}

.product-details {
  max-width: 500px;
}

.options,
.product-details,
.img-area {
  flex: 1 1 260px;
  height: auto;
  max-width: 400px;
  min-width: 300px;
  height: inherit;
}

.img-area p {
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
  max-width: 100%;
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
</style>
