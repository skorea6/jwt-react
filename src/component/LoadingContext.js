import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = () => setLoadingCount((count) => count + 1);
  const decrementLoading = () =>
    setLoadingCount((count) => Math.max(0, count - 1));

  return (
    <LoadingContext.Provider
      value={{
        loadingCount,
        incrementLoading,
        decrementLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoadingContext must be used within a LoadingContextProvider"
    );
  }
  return context;
};
