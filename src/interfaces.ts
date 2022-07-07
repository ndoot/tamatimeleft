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
  netPerMonth: number;
}

export const defaultFinanceReport: FinanceReport = {
  dying: undefined,
  daysToLive: -1,
  incomeCategories: [],
  expensesCategories: [],
  netPerMonth: 0,
};
