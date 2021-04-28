import React, { useContext } from "react";
import { Context, SetContext } from "./index";

const App = () => {
  const contextState = useContext(Context);
  const setContext = useContext(SetContext);
  const { count } = contextState;

  return (
    <div>
      <h3>React hooks</h3>
      <button
        onClick={() => {
          setContext({
            ...contextState,
            count: count ? count + 1 : 1,
          });
        }}
      >
        click
      </button>
      <p>{JSON.stringify(contextState)}</p>
    </div>
  );
};

export default App;
