
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import themeContext from "./context/ThemeContext";
import { useState } from "react";
import BodyComponents from "./components/BodyComponents";
function App() {
  const [theme,setTheme] = useState('light')
  return (
    <themeContext.Provider value={{theme:theme,setTheme:setTheme}}>
    <Provider store={store}>
    <div className="App">
      
      <div className="flex">
        
       <BodyComponents />
      </div>
    </div>
    </Provider>
    </themeContext.Provider>
  );
}
export default App;
