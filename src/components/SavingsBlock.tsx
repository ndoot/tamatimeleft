import { ChangeEvent } from "react";
import { Card } from "theme-ui";
import { FormValue } from "../interfaces";
import { AutoComplete } from "./Autocomplete";
import { EachBox, EachField, StyledInput } from "./Block";

interface Props {
  formValue: FormValue;
  updateForm: (
    fieldName: string,
    fieldVal: string | number,
    blockType: string,
    idx: number
  ) => void;
  idx: number;
}

const SavingsBlock = (props: Props) => {
  const { formValue, updateForm, idx } = props;

  const data = ["Savings account", "Everyday account"];

  return (
    <div className="SavingsBlock">
      <Card>
        <EachBox as="form" onSubmit={(e) => e.preventDefault()}>
          <EachField>
            <AutoComplete
              optionsStyle={{ backgroundColor: "white" }}
              inputType="Category"
              data={data}
              updateForm={updateForm}
              name="category"
              idx={idx}
              blockType="savings"
              searchText={formValue.category}
            />
          </EachField>
          <EachField>
            <StyledInput
              placeholder="Amount"
              type="number"
              min="0.00"
              step="0.01"
              value={formValue.amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateForm(e.target.name, e.target.value, "savings", idx)
              }
              name="amount"
            />
          </EachField>
        </EachBox>
      </Card>
    </div>
  );
};

export default SavingsBlock;
