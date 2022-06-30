export interface FormValue {
  category: string;
  amount: number | undefined;
  frequency: string;
  blockType: string;
  [propName: string]: any;
}
