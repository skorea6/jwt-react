import { useLoadingContext } from "../component/LoadingContext";

const useApiWithLoading = (apiFunction) => {
  const { incrementLoading, decrementLoading } = useLoadingContext();

  const callApi = async (...args) => {
    incrementLoading();
    try {
      const result = await apiFunction(...args);
      return result;
    } finally {
      decrementLoading();
    }
  };

  return callApi;
};

export default useApiWithLoading;
