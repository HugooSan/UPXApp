import { CURRENCIES } from "@/assets/data/currencies";
import AppContext from "@/context/AppContext";
import { ICurrency } from "@/hooks/currency/type";
import { useState } from "react";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currencies, setCurrencies] = useState<Array<ICurrency>>(
    CURRENCIES.filter((v) => ['BRL', 'USD', 'CAD'].includes(v.code))
  );

  return (
    <AppContext.Provider value={{ currencies, setCurrencies }}>
      {children}
    </AppContext.Provider>
  );
}
