import { createContext } from "react";
import { FinanceReport } from "../interfaces";
import { defaultFinanceReport } from "../constants";

const reportContext = createContext({
  report: defaultFinanceReport,
  setReport: (newReport: FinanceReport) => {},
});

export default reportContext;
