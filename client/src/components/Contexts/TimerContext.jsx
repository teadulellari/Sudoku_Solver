import { createContext } from "react";

const TimerContext = createContext(null);
const exposeStopTimer = (stopTimer) => {
    return {
      stopTimer,
    };
  };
  
  export { TimerContext, exposeStopTimer };