import { ICurrency } from "@/hooks/currency/type";
import { Dispatch, SetStateAction, createContext } from "react";

export const InitialValue: {
  currencies: Array<ICurrency>;
  setCurrencies: Dispatch<SetStateAction<ICurrency[]>>;
} = {
  currencies: [],
  setCurrencies: () => {},
};

const AppContext = createContext(InitialValue);
export default AppContext;
