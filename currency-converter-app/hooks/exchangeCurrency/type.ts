import { CurrencyType } from "@/types/currency";

export interface IExchangeCurrency {
  result: "success" | "error";
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: Date;
  time_next_update_unix: number;
  time_next_update_utc: Date;
  time_eol_unix: number;
  base_code: CurrencyType;
  rates: { [key in CurrencyType]: number };
}
