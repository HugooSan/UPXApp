import { useCallback, useContext, useMemo } from "react";
import useExchangeCurrency from "../exchangeCurrency/useExchangeCurrency";
import { CurrencyType } from "@/types/currency";
import AppContext from "@/context/AppContext";

const useCurrency = () => {
  const { currencies, setCurrencies } = useContext(AppContext);

  const { getExchangeCurrency } = useExchangeCurrency();

  const consolidateCurrencies = useMemo(
    () => currencies.filter((v) => !!v.rates),
    [currencies]
  );

  const consolidateCurrencyRates = useCallback(
    async (currency: CurrencyType) => {
      const exchangeCurrency = await getExchangeCurrency(currency);

      if (!exchangeCurrency) return;

      setCurrencies(
        currencies.map((v) =>
          v.code === exchangeCurrency.base_code
            ? { ...v, rates: exchangeCurrency.rates }
            : v
        )
      );
    },
    [currencies, getExchangeCurrency]
  );

  return {
    consolidateCurrencies,
    currencies,
    consolidateCurrencyRates,
  };
};

export default useCurrency;
