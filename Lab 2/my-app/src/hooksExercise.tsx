import { click } from "@testing-library/user-event/dist/click";
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
/*
function ClickCounter() {
    const [count, setCount] = useState(0);

    //the code in the return statement will auto-rerender because it is connected to teh variable {count}
    //however, this is like a "side effect" block where you specify teh dependances which have to change in order for this run (in this case, [count]). only changes when count changes; not on every re-render
    useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]);
      
      const theme = useContext(ThemeContext);
      return (
         <div
           style={{
             background: theme.background,
             color: theme.foreground,
             padding: "20px",
           }}
         >
           <p>You clicked {count} times </p>
           <button
             onClick={() => setCount(count + 1)}
             style={{ background: theme.foreground, color: theme.background }}
           >
             Click me
           </button>
         </div>
       );
      
  }
*/
function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        {/*<ClickCounter /> clickcounter is above here so does not need to be exported*/}
      </ThemeContext.Provider>
    );
   }
   
export default ToggleTheme;
   
   
  
  