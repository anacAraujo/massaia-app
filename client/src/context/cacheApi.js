import React, { useState, useEffect } from "react";

export const CacheApi = React.createContext();

// TODO change name to cacheApi
export default function CacheApiProvider({ children }) {
  const [cacheApi, setCacheApi] = useState({});

  useEffect(() => {
    setCacheApi();
  }, []);

  return (
    <CacheApi.Provider value={{ cacheApi, setCacheApi }}>
      {children}
    </CacheApi.Provider>
  );
}
