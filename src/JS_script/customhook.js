import { useState } from "react";



export const useCustomHook = () => {
    const [state, setState] = useState(false);
  
    const updateState = (newValue) => {
      setState(newValue);
    };
  
    return [ state, updateState ];
};