export interface FormValue {
  category: string;
  amount: number | "";
  frequency?: string;
  rate?: number;
  blockType: string;
  [propName: string]: any;
}

export interface FinanceReport {
  dying: boolean | undefined;
  daysToLive: number;
  incomeCategories: [];
  expensesCategories: [];
}
