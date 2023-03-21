import { createWebHistory, createRouter } from "vue-router";
import loginPage from "../views/LoginPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import ProductPage from "../views/ProductPage.vue";
import cartItems from "../views/cartItems.vue";
import HomePage from "../views/HomePage.vue";

const isAuthenticated = () => !!localStorage.getItem("token");
console.log(isAuthenticated());

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      //Nested Route paths defined for Navigation menu
      children: [
        {
          path: "products",
          name: "productsPage",
          component: ProductsPage,
          beforeEnter: () => {
            if (!isAuthenticated()) {
              router.push({ name: "loginPage" });
            }
          },
        },
        {
          path: "cart",
          name: "cartItems",
          component: cartItems,
        },
        {
          path: "returnPolicy",
          name: "returnPolicy",
          component: () => import("../views/returnPolicy.vue"),
        },
        {
          path: "signOut",
          name: "signOut",
          component: () => import("../views/signOut"),
        },
        {
          path: "/product/:id",
          name: "Product",
          component: ProductPage,
        },
      ],
      beforeEnter: () => {
        if (!isAuthenticated()) {
          router.push({ name: "loginPage" });
        }
        // else if (isAuthenticated()) {
        //   router.push({ name: "productsPage" });

          // console.log("yea")
          // console.log(`to: ${to}, from: ${from}, next: ${next}`)
        // }
      },
    },
    {
      path: "/login",
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
      path: "/*",
      name: "NotFound",
      component: () => import("../views/404Page.vue"),
    },
  ],
});

export default router;
