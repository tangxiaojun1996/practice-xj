import React from "react";
import { Context, SetContext } from "./index";

function App() {
  return (
    <Context.Consumer>
      {(contextState) => {
        const { count } = contextState;
        return (
          <SetContext.Consumer>
            {(setContext) => (
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
            )}
          </SetContext.Consumer>
        );
      }}
    </Context.Consumer>
  );
}

export default App;
