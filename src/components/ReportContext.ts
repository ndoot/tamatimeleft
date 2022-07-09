import { createContext } from "react";
import { defaultFinanceReport, FinanceReport } from "../interfaces";

const reportContext = createContext({
  report: defaultFinanceReport,
  setReport: (newReport : FinanceReport) => {}
});

export default reportContext;
