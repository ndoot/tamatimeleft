import update from "immutability-helper";
import type { CSSProperties, FC } from "react";
import { useCallback, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";
import { FinanceReport } from "../interfaces";
import { DraggableBox } from "./DraggableBox";
import type { DragItem } from "./interfaces";
import { ItemTypes } from "./ItemTypes";
import { Heading } from "theme-ui";
import coin from './assets/coin.gif'
import { BoxMap } from "../interfaces";
import fish from './assets/fish.png'; 
import reportContext from "./ReportContext";

const StyledCatSection = styled.div`
    margin-top: -500px;
    height: 500px;
    align-items: center;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const StyledShop = styled.div`
  height: 80px;
  background-color: ${(props) => props.theme.colors?.highlight};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-top: -20px;
  position: relative;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Coins = styled.div`
  position: absolute;
  display: flex;
  right: 10px;
  margin-top: 5px;

`
const Coin = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;

`
const NumCoins = styled(Heading)`
  margin-top: 20px;
  margin-left: 2px;
  font-size: 20px;
`
const StyledItem = styled.div`
  width: 60px;
  height: 60px;
  margin-top: 10px;
  border: 3px solid brown;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #fabeb0;
  filter: grayscale(1);
`
const ActiveItem = styled(StyledItem)`
  filter: grayscale(0);
  background-color: #fabeb0;
  &:hover {
    cursor: pointer;
  }
`;


export const Container: FC = () => {
  //const coins = useContext(CoinContext);
  const { report, setReport } = useContext(reportContext);
  const [boxes, setBoxes] = useState<Array<BoxMap>>([
    { top: 20, left: 80, title: "fish" },
    { top: 180, left: 20, title: "fish" }
  ]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);

        moveBox(item.id, left, top);
        return undefined;
      }
    }),
    [moveBox]
  );

  
  interface Items {
    [propName: string]: any;
  }
  const items: Items = {
    "fish": [fish, 20],
  }
  const purchaseItem = (item: string, price: number) => {
    let newcoins = report.netPerMonth - price;
    setReport({...report, netPerMonth: newcoins,});
    setBoxes([...boxes, { top: 180, left: 20, title: item }]);
  }

  return (
    <>
      <StyledCatSection ref={drop}>
        {boxes.map((item, i) => (
          <DraggableBox
            key={i}
            id={i.toString()}
            {...(boxes[i] as { top: number; left: number; title: string })}
          />
        ))}
      </StyledCatSection>
      <StyledShop>
        <Coins>
          <>
          <Coin src={coin} alt="coin"></Coin>
          <NumCoins>X<span style = {{fontSize: "5px"}}> </span>{report.netPerMonth >= 0 ? report.netPerMonth : 0}</NumCoins>
          </>
        </Coins>
        {Object.keys(items).map((key) => (
          (report.netPerMonth >= items[key][1]) 
            ?
            <ActiveItem key={key} id={key} onClick = {() => purchaseItem(key, items[key][1])}>
                <img src = {items[key][0]} alt={key}></img>
            </ActiveItem>
            :
            <StyledItem key={key} id={key}>
                <img src = {items[key][0]} alt={key}></img>
            </StyledItem>

        ))}
      </StyledShop>
    </>
  );
};
