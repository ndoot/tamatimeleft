import React from "react";
import { Divider, Heading } from "theme-ui";
import "./App.css";
import CalculatorSection from "./components/CalculatorSection";
import CatSection from "./components/CatSection";

const App = () => {
  return (
    <div className="App">
      <Heading>Savings Cat-culator</Heading>
      <CatSection />
      <Divider />
      <CalculatorSection />
    </div>
  );
};

export default App;
