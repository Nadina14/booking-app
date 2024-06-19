import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { UserProvider } from "./context/UserContext.js";
import { SearchContextProvider } from "./context/SearchContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
      </UserProvider>
  </React.StrictMode>
);