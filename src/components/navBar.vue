<template>
  <nav>
    <div class="home">
      <RouterLink to="/">
        <img
          src="https://i.pinimg.com/originals/d7/25/2a/d7252a71a8943948bb9f438aa6fcd6bf.jpg"
          alt="logo"
          class="logo"
        />
      </RouterLink>
    </div>
    <div class="right">
      <div class="navLink" v-if="!isAuthenticated && !isSignup">
        <RouterLink to="/signup">
          <div class="nestedRoutes">
            <small> Hello, Sign up</small>
            <h4 class="h4">Accounts & Lists</h4>
          </div>
        </RouterLink>
      </div>
      <div class="navLink" v-else-if="isSignup">
        <RouterLink to="/login">
          <div class="nestedRoutes">
            <small> Hello, Login</small>
            <h4 class="h4">Accounts & Lists</h4>
          </div>
        </RouterLink>
      </div>
      <div class="navLink" v-else>
        <RouterLink to="/signOut">
          <div class="nestedRoutes">
            <small> Hello, {{ result }}</small>
            <p>{{ user }}</p>
            <h4 class="h4">Accounts & Log-out</h4>
          </div>
        </RouterLink>
      </div>
      <div class="navLink">
        <RouterLink to="/returnPolicy" v-show="isAuthenticated">
          <div class="nestedRoutes">
            <small> Rate Me</small>
            <h4 class="h4">& Others</h4>
          </div>
        </RouterLink>
      </div>
      <div class="navLink">
        <RouterLink to="/cart" v-show="isAuthenticated">
          <div class="nestedRoutes icon">
            <font-awesome-icon :icon="['fas', 'cart-plus']" class="iconn" />
            <h4>cart</h4>
          </div>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { computed } from "vue";
import { getValueFromLocalStorage } from "../composables/getcurrentuser";
import { useRoute } from "vue-router";

const route = useRoute();
const isSignup = computed(() => route.path === "/signup");
const { result } = getValueFromLocalStorage("username");

//Check for authentication
const isAuthenticated = computed(() => !!localStorage.getItem("token"));



</script>
<style>
nav {
  height: 75px;
  width: 100%;
  background-color: rgb(29, 28, 28);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;
}

.home a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 110px;
  height: 55px;
  overflow: hidden;
}

.home:hover {
  border: 1px solid white;
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.logo {
  width: 180px;
  height: 150px;
  margin-right: 200px;
  position: absolute;
  left: -38px;
}

.navLink a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 55px;
  overflow: hidden;
}

.navLink:hover {
  border: 1px solid white;
}

.nestedRoutes small {
  font-size: 11.5px;
  color: rgb(188, 181, 181);
}

.nestedRoutes {
  padding: 9px;
}

.h4 {
  font-size: 12px;
  font-weight: 900;
  color: white;
}

.nestedRoutes.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nestedRoutes.icon h4 {
  color: white;
  align-self: flex-end;
  font-size: 12px;
  text-transform: capitalize;
}

.iconn {
  width: 35px;
  height: 35px;
  color: white;
}
</style>
