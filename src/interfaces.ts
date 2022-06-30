export interface FormValue {
  category: string;
  amount: number | undefined;
  frequency: string;
  [propName: string]: any;
}
