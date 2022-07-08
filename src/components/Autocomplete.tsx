import react, { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Input } from "theme-ui";
import { theme } from "../theme";

/*
CREDIT FOR MOST OF THIS BELONGS TO
https://codesandbox.io/s/simple-react-autocomplete-functionalcomponent-typescript-ki51s?from-embed=&file=/src/index.tsx

Major changes were made to the design and functionality, including getting it working with existing components and
adding additional features, including auto-highlight, inputtype changed to array and all styling, removal of dropdown button
*/

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const baseButtonMixin = css`
  background: none;
  border: none;
  padding: 0;
`;

const AutoCompleteContainer = styled.ul`
  background: white;
  padding: 8px 0;
  list-style-type: none;
  min-width: 320px;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #b6c1ce;
  border-radius: 2px;
  margin: 0;
  box-sizing: border-box;
  max-height: 280px;
  overflow-y: auto;
  z-index: 1;
`;

const AutoCompleteItem = styled.li`
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background-color: ${theme.colors?.muted} !important;
  }
`;

const AutoCompleteItemButton = styled.button`
  ${baseButtonMixin} width: 100%;
  line-height: 32px;
  text-align: left;
  font-family: "Press Start 2P";
  &:active {
    outline: none;
    color: #0076f5;
  }
`;

const StyledInput = styled(Input)`
  background-color: white;
  width: 100%;
  height: 40px;
  font-family: "Press Start 2P";
`;

interface autoCompleteProps {
  optionsStyle?: react.CSSProperties;
  inputType?: string;
  data: any[];
  updateForm: (
    fieldName: string,
    fieldVal: string | number,
    blockType: string,
    idx: number
  ) => void;
  idx: number;
  blockType: string;
  name: string;
  searchText: string;
}

interface SearchData {
  text: string;
  suggestions: string[];
}

export const AutoComplete: FC<autoCompleteProps> = ({
  optionsStyle,
  inputType,
  data,
  updateForm,
  idx,
  blockType,
  name,
  searchText,
}) => {
  const [search, setSearch] = useState<SearchData>({
    text: searchText,
    suggestions: [],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions = [];
    const regex = new RegExp(`^${value}`, "i");
    suggestions = data.sort().filter((v: string) => regex.test(v));
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value: string) => {
    setIsComponentVisible(false);
    setSearch({
      text: value,
      suggestions: [],
    });
  };

  const { suggestions } = search;

  useEffect(() => {
    updateForm(name, search.text, blockType, idx);
  }, [search]);

  useEffect(() => {
    setSearch({ ...search, text: searchText });
  }, [searchText]);

  return (
    <Root>
      <div
        onClick={() => setIsComponentVisible(false)}
        style={{
          display: isComponentVisible ? "block" : "none",
          width: "200vw",
          height: "200vh",
          backgroundColor: "transparent",
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      />
      <div>
        <StyledInput
          id="input"
          autoComplete="off"
          placeholder={inputType}
          value={search.text}
          onChange={onTextChanged}
          type={"text"}
          name={name}
        />
      </div>
      {suggestions.length > 0 && isComponentVisible && (
        <AutoCompleteContainer style={optionsStyle}>
          {suggestions.map(function (item: string, index: any) {
            return (
              <AutoCompleteItem
                key={item}
                style={{
                  backgroundColor: index === 0 ? "#ebf4ff" : "",
                }}
              >
                <AutoCompleteItemButton
                  key={item}
                  onClick={() => suggestionSelected(item)}
                >
                  {item}
                </AutoCompleteItemButton>
              </AutoCompleteItem>
            );
          })}
        </AutoCompleteContainer>
      )}
    </Root>
  );
};
