import { ref, onMounted } from "vue";
import axios from "axios";

export  function useFetchData(url) {
  const datas = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchData() {
    isLoading.value = true;
    try {
      const response = await axios.get(url);
      datas.value = response.data;
    } catch (err) {
      error.value = err;
    }
    isLoading.value = false;
  }

  // onMounted(fetchData);

  return {
    data,
    isLoading,
    error,
    fetchData
  };
}
