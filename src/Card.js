import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

/**
 * Card
 */
export default function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );
  return (
    <div
      ref={dragRef}
      style={{
        opacity,
        width: 80,
        height: 80,
        background: "red",
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {text}
    </div>
  );
}
