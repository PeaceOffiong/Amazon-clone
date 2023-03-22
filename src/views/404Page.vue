<template>
  <navBar />
  <div class="center404">
    <h3>Oops, Page Not found</h3>
    <router-link to="/">
      <button class="btn">Return Home</button>
    </router-link>
  </div>
</template>

<script setup>
import navBar from "@/components/navBar.vue";
</script>

<style>
.center404{
    height: 30vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
}

.btn{
     background-image: linear-gradient(0deg,
            rgb(243, 190, 91) 70%,
            rgb(243, 225, 188));
    height: 35px;
    border: none;
    width: 150px;
    border-radius: 6px;;
}

</style>
