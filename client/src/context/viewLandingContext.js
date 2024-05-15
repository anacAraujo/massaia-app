import React, { useState, useEffect } from "react";

export const ViewLandingContext = React.createContext();

export function ViewLandingContextProvider({ children }) {
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  function handleHasViewedLandingPage(hasViewedLandingPage) {
    setHasViewedLandingPage(hasViewedLandingPage);
    localStorage.setItem(
      "hasViewedLandingPage",
      JSON.stringify(hasViewedLandingPage)
    );
  }

  useEffect(() => {
    setHasViewedLandingPage(false);
  }, []);

  return (
    <ViewLandingContext.Provider
      value={{ hasViewedLandingPage, handleHasViewedLandingPage }}
    >
      {children}
    </ViewLandingContext.Provider>
  );
}
