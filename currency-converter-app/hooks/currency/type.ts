import { CurrencyType } from "@/types/currency";

export interface ICurrency {
  code: CurrencyType;
  name: string;
  country: string;
  rates?: { [key in CurrencyType]: number };
}
