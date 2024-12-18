import { createContext } from "react";
import data from "../data/fetchData";

export const dataContext = createContext();
export const DataContextProvider = (props) => {
  return (
    <dataContext.Provider value={data}>{props.children}</dataContext.Provider>
  );
};
