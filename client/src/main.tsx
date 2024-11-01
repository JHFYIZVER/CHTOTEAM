import { createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AsideStore from "./shared/store/AsideStore.ts";
import ModalStore from "./shared/store/ModalStore.ts";
import App from "./App.tsx";

import "./index.css";

export const Context: any = createContext(null);

createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{ aside: new AsideStore(), modal: new ModalStore() }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
