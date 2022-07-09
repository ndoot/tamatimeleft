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
  savingsPercentage: number;
  nonEssentialExpenses: CategoryTotal[];
  variableExpenses: CategoryTotal[];
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface BoxMap {
  top: number;
  left: number;
  title: string;
}
