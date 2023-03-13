import { createWebHistory, createRouter } from "vue-router";
import loginPage from "../views/LoginPage.vue";
import ProductsPage from "../views/ProductsPage.vue";

const isAuthenticated = () => !!localStorage.getItem("token");
console.log(isAuthenticated());

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "loginPage",
      component: loginPage,
      beforeEnter: () => {
        if (isAuthenticated()) {
          router.push({ name: "productsPage" });
        }
      },
    },
    {
      path: "/signup",
      name: "signupPage",
      component: () => import("../views/SignUp.vue"),
      beforeEnter: () => {
        if (isAuthenticated()) {
          router.push({ name: "productsPage" });
        }
      },
    },
    {
      path: "/products",
      name: "productsPage",
      component: ProductsPage,
      beforeEnter: () => {
        if (!isAuthenticated()) {
          router.push({ name: "loginPage" });
        }
      },
    },
  ],
});

export default router;