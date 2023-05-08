import "./styles.css";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Constants";
import { useState } from "react";

function Board(props) {
  const [items, setItems] = useState([...props.items]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item) => {
        console.log(item);
        const NewCard = <Card {...item} />;
        setItems([...items, NewCard]);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [items]
  );

  return (
    <div
      ref={drop}
      style={{
        background: props.color,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 6,
        paddingTop: 0,
        minHeight: 300,
        position: "relative"
      }}
    >
      <div style={{ border: "1px solid gray" }}>
        <h5 style={{ margin: 0, background: "black", color: "white" }}>
          {props.text.toUpperCase()}
        </h5>
      </div>
      <div style={{ display: "flex", gap: 12 }}>{items}</div>
      {isOver && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            minHeight: 400,
            background: "#00ba1aa3"
          }}
        ></div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Board
          color="yellow"
          text="people"
          items={[<Card text="1234" />]}
        ></Board>
        <Board color="blue" text="monday" items={[]}></Board>
      </div>
    </DndProvider>
  );
}
