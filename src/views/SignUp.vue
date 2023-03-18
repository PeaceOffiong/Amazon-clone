<template>
  <section>
    <Navbar/>
    <div class="entire-container">
      <div class="box-container">
        <h3>Create account</h3>
        <form @submit.prevent="handleSubmit">
          <label for="name">Your name</label>
          <input
            type="text"
            name="name"
            v-model="state.name"
            placeholder="First and last name"
          />
          <label for="email">Email</label>
          <input type="email" name="email" v-model="state.email" />
          <label for="Password">Password</label>
          <input
            type="password"
            name="Password"
            v-model="state.password"
            placeholder="At least 6 characters"
            :class="alertPassword ? 'red' : ''"
          />
          <p class="alert">{{ alertPasswordTooShort }}</p>
          <label for="Re-enter">Re-enter Password</label>
          <input
            type="password"
            name="Re-enter"
            v-model="state.confirmPassword"
            :class="alertCPassword ? 'red' : ''"
          />
          <p class="alert">{{ alertConfirmPasswordNotMatch }}</p>
          <input type="submit" value="Create an amazon account" />
          <p class="agreement privacy">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <div class="lower-section2"></div>
          <p class="help">
            Already have an account? <RouterLink to="/" class="signIn">Sign in</RouterLink>
            <br />
            Buying for work? Create a free business account<br />
          </p>
        </form>
      </div>
      <div class="lower-section"></div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/navBar.vue"
import router from "@/router";
import { reactive, ref } from "vue";
import users from "../assets/users";

//Defining value of Inputs
const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

//Setting States for alert Messages to cover edge cases
const alertConfirmPasswordNotMatch = ref("");
const alertPasswordTooShort = ref("");

//Setting DANGER COLOR on affected Inputs through classNames && Truthy value
const alertPassword = ref(false);
const alertCPassword = ref(false);
console.log(users);

//Handle Submit Form
const handleSubmit = () => {
  //Return alert Truthy values and messages to default in a case of resubmission
    alertCPassword.value = false,
    alertPassword.value = false,
    alertConfirmPasswordNotMatch.value = "",
    alertPasswordTooShort.value = "";

  //Run check on possible edgecases
  if (state.confirmPassword !== state.password) {
    alertConfirmPasswordNotMatch.value = "password must match";
    alertCPassword.value = true;
    alertPassword.value = true;
  } else if (state.password.length < 6) {
    alertPasswordTooShort.value = "Minimum 6 characters required";
    alertPassword.value = true;
  } else {
    //Add user details to database
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    users.push(user);

    //set token on browser to avoid re-entry into Login page
    localStorage.setItem("token", state.password);

    localStorage.setItem("username", state.name);

    //Return Input values to default
    state.name = "";
    state.email = "";
    state.password = "";
    state.confirmPassword = "";
    alert.value = false;

    //Navigate to Products Page
    router.push({ name: "productsPage" });
    console.log(user);
  }
};
</script>

<style>
.signIn{
  font-weight: 900;
  font-size: 13px;
}
</style>
