import {
    ref,
    isRef,
    unref,
    watchEffect
} from "vue";

export function useFetch(url) {
  //setting state managed by composable
  const products = ref([]);
  const load = ref(true);
  const error = ref(null);

  //function to fetch data
  function getData() {
    //reset state
    products.value = null;
    load.value = null;
    error.value = null;

    // unref()
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (products.value = json.products))
      .then(() => (load.value = false))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    watchEffect(getData);
  } else {
    getData();
  }

  return { products, load, error, getData};
}
