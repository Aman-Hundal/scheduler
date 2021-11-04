import {useState} from 'react';

//Hook which keeps track of the history of the modes, so we can go backwards or forwards. We store this history as a stateful array called history in our Hook. We'll interact with history through the transition and back actions.
const useVisualMode = function(initial) {
  const [history, setHistory] = useState([initial]);

  //Function which helps manage our mode/rendering of components. Transitions ahead to the passed in mode/component.
  const transition = function(newMode, replace = false) {
    
    setHistory((prev) => { 
      const copyPrev = [...history];
      if (replace) {
        copyPrev.pop();
      }
      return [...copyPrev, newMode];
    });
  }
  
  //Function which helps manage our mode/rendering of components. Goes back to our previous component render.
  const back = function() {

    if (history.length === 1) {
      return;
    }

    setHistory((prev) => {
      return [...history].slice(0,-1);
    });
  }

  const mode = history[(history.length - 1)];

  return { mode, transition, back };
}

export default useVisualMode;