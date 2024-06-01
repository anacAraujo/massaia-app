import React, { useState, useEffect } from "react";

export const cacheApi = React.createContext();

// TODO change name to cacheApi
export default function cacheApiProvider({ children }) {
 const [cacheApi, setCacheApi] = useState({});

  useEffect(() => {
    setCacheApi();
  }, []);

  return (
    <AlbumsInfo.Provider
      value={{ cacheApi, setCacheApi }}
    >
      {children}
    </AlbumsInfo.Provider>
  );
}
