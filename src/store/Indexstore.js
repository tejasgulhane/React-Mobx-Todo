import React from "react";

import Authstore from "./Authstore";
import todostore from "./todostore";

class RootStore {
  constructor() {
    this.Authstore = new Authstore(this)
    this.todostore = new todostore(this)
  }
}

const StoresContext = React.createContext(new RootStore());

export const Indexstore = () => React.useContext(StoresContext);