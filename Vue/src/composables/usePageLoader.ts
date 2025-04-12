import { ref } from 'vue';

export function usePageLoader() {
  const loading = ref(true);

  const startLoading = () => {
    loading.value = true;
  };

  const stopLoading = () => {
    loading.value = false;
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
}
