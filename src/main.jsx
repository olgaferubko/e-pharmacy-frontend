import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
import "modern-normalize";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/lib/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <App />
          <Toaster position="top-center" />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>
);