import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
