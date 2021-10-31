import {useState} from 'react';

const useVisualMode = function(initial) {
  const [history, setHistory] = useState([initial]); //In order to do the above, we will need to keep track of the history of the modes, so we can go backwards. We can store this history as a stateful array called history in our Hook. We'll interact with history through the transition and back actions. In the following code we are initializing our history as an array with the first mode that gets passed to useVisualMode.

  const transition = function(newMode, replace = false) {

    // console.log([...history].splice(-1,1, newMode))
    
    setHistory((prev) => { 
      const copyPrev = [...history]
      if (replace) {
        copyPrev.pop()
      }
      return [...copyPrev, newMode]; //adds the new mode to our history state (which is an array of the current and previos mode states) to track the history of our modes. YOU CANNOT PUSH TO A STATE (history in this case) AS THIS MODIFIES/MUTATES A STATE. TO DO ANYHTING TO A STATE YOU MUST USE THE SETTTER. Therefore this code does a similar thing to what push would do -> what its doing is making a shallow copy of the current mode history array values, adding a newMode value (to keep track of the mode history) and putting it in array again with []
    });

  }
  
  const back = function() {

    if (history.length === 1) {
      return;
    }

    setHistory((prev) => {
      return [...history].slice(0,-1); //NEED CONFIRMATION ON THISSSS -> DOESENT THIS MUTATE/MODIFY THE STATE? ALSO WHY DOES THIS SETTER NOT RUN FIRST?! is that because the DOM has already beein painted this render? The new history state will only be updated in the next render and the next painting?
    });
  }

  const mode = history[(history.length - 1)] // REMOVE ALL INSTANCE OF MODE -> mode is now just the last value in your hisory array

  return { mode, transition, back };
}


export default useVisualMode;

// ALWAYS MAKE COPIES OF STATES -> then modify and set STATE as copy