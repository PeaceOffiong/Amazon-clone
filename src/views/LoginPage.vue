<template>
  <section>
    <Navbar/>
    <div class="entire-container">
      <div class="box-container">
        <h3>Sign in</h3>
        <form @submit.prevent="handleSubmit">
          <label for="email">Email </label>
          <input type="email" name="email" v-model="email" :class="nonExistingUser ? 'red' : ''"/>
          <p class="alert">{{ nonExistingUser }}</p>

          <label for="password">Password</label>
          <input type="text" name="password" v-model="password" :class="wrongPassword ? 'red' : ''"/>
          <p class="alert">{{ wrongPassword }}</p>

          <input type="submit" value="Continue"/>

          <small class="agreement"
            >By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.</small
          >
          <p class="help">Need help</p>
        </form>
      </div>
      <div class="lower-section">
        <div class="line-area">
          <div class="line"></div>
          <div class="inside">
            <small>New to Amazon ?</small>
          </div>
        </div>
        <RouterLink to="/signup" class="button">
          <button>Create your Amazon account</button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/navBar.vue"
import router from "@/router";
import users from "../assets/users";
import { ref } from "vue";

//bind input value to state
const email = ref("");
const password = ref("");

//set States for alertMessages on Failure of condition
const nonExistingUser = ref("");
const wrongPassword = ref("");

const handleSubmit = () => {

  //reset to default in cases of re-submission
  nonExistingUser.value = "",
  wrongPassword.value = ""

  //Loop through DB to find if user exists
  const existingUserInDB = users.find(user => user.email === email.value);

  if (existingUserInDB) {
    if (existingUserInDB.password === password.value) {
      //set Token on Browser to avoid re-routing to login
      localStorage.setItem("token", password.value);

      localStorage.setItem("username", existingUserInDB.name)

      //Navigate to ProductsPage
      router.push({ name: "productsPage" })
    } else {
      wrongPassword.value ="Password Incorrect"
    }
  } else {
    nonExistingUser.value = "User not found"
  }
}

</script>

<style>
</style>
