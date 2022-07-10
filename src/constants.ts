import { FinanceReport } from "./interfaces";

// Essential -> Variable -> Non-essential
export const expensesCategories: { [propName: string]: string } = {
  Entertainment: "Non-essential",
  Rent: "Essential",
  Groceries: "Essential",
  Restaurants: "Non-essential",
  Internet: "Variable",
  Phone: "Variable",
  Water: "Essential",
  Electricity: "Essential",
  Insurance: "Essential",
  Petrol: "Variable",
  Clothing: "Non-essential",
  "Household items": "Variable",
  Haircuts: "Variable",
  Investing: "Variable",
  "Loan repayment": "Essential",
  Gifts: "Non-essential",
  Charity: "Non-essential",
  Alcohol: "Non-essential",
  Gym: "Essential",
  Medicine: "Essential",
  Sports: "Non-essential",
};

export const defaultFinanceReport: FinanceReport = {
  dying: undefined,
  daysToLive: -1,
  savings: 0,
  incomePerMonth: 0,
  incomeOneOff: 0,
  expensesPerMonth: 0,
  expensesOneOff: 0,
  incomeCategories: [],
  expensesCategories: [],
  netPerMonth: 0,
  savingsPercentage: 0,
  nonEssentialExpenses: [],
  variableExpenses: [],
};

export const expenseTypeColors: { [propName: string]: string } = {
  Needs: "#00A6B2",
  Wants: "#ED4E1E",
  Other: "#35B72C",
};

export const gradientColors = [
  "#AF3125",
  "#CC4C33",
  "#E08062",
  "#EFA683",
  "#F9CCAE",
];
