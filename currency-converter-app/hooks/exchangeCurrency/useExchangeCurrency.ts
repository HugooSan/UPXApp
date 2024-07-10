import { CurrencyType } from "@/types/currency";
import { useCallback } from "react";
import { IExchangeCurrency } from "./type";

const API_VERSION = "v6";

const API = `https://open.er-api.com/${API_VERSION}`;  

const useExchangeCurrency = () => {
  const getExchangeCurrency = useCallback(async (currency: CurrencyType) => {
    try {
      return fetch(`${API}/latest/${currency}`)
        .then((response) => response.json())
        .then<IExchangeCurrency>((data) => data)
        .then((data) => (data.result === "success" ? data : null));
    } catch (err) {
      console.log(err);
      return null;
    }
  }, []);

  return {
    getExchangeCurrency,
  };
};

export default useExchangeCurrency;
