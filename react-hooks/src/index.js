import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const defaultContext = {
  default: "hello context!",
  // updateContext: ()
};

export const Context = React.createContext(defaultContext);
export const SetContext = React.createContext(() => {}); // 也可以将set的context合并在Context中，这里正好试验多个context的情况

const ContextProvider = (props) => {
  const [state, setState] = useState(defaultContext);

  return (
    <Context.Provider value={state}>
      <SetContext.Provider value={setState}>
        {props.children}
      </SetContext.Provider>
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
