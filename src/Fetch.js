import {
    ref,
    // isRef,
    unref,
    // watchEffect
} from "vue";

export function useFetch(url) {
  //setting set managed by composable
  const data = ref([]);
  const loading = ref(true);
  const error = ref(null);

  //function to fetch data
  function getData() {
    //reset state
    // data.value = null;
    // loading.value = null;
    // error.value = null;

    //unref()
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .then(() => (loading.value = false))
      .catch((err) => (error.value = err))
  }

//   if (isRef(url)) {
//     watchEffect(getData);
//   } else {
//     getData();
//   }

  return { data, loading, error, getData};
}
