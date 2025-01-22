import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Layout from "./component/authed/layout/layout";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <Layout>
        <App />          
        </Layout>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
