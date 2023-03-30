<template>
    <article class="container" v-if="loading">
    loading
    </article>
    <article class="container" v-if="!loading">
    {{ product }}
    </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

//state
const product = ref({});
const loading = ref(false);

//get route
const route = useRoute();

const fetchProduct = () => {
  const param = route.params.id;
  const endPoint = `https://dummyjson.com/products/${param}`

    fetch(endPoint)
        .then((response) => response.json())
        .then((json) => (product.value = json))
        .finally(() => loading.value);
};

onMounted(() => {
    fetchProduct();
});
</script>
<style></style>
