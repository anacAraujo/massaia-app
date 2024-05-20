import React, { useState, useEffect } from "react";

// TODO create current song context

// TODO create albumns info context

export const ViewLandingContext = React.createContext();

// TODO delete and use state instead of context
export function ViewLandingContextProvider({ children }) {
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  function handleHasViewedLandingPage(hasViewedLandingPage) {
    setHasViewedLandingPage(hasViewedLandingPage);
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
