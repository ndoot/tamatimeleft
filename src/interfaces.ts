export interface FormValue {
  category: string;
  amount: number | undefined;
  frequency?: string;
  rate?: number;
  blockType: string;
  [propName: string]: any;
}
