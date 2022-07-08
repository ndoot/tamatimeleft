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
  incomeCategories: CategoryTotal[];
  expensesCategories: CategoryTotal[];
  netPerMonth: number;
  savings: number;
  incomePerMonth: number;
  incomeOneOff: number;
  expensesPerMonth: number;
  expensesOneOff: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}
