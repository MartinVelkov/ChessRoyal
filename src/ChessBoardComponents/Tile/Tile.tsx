import React from "react";
import "./Tile.css";

interface Props {
  image?: string;
  number: number;
  highlight: boolean;
  names?: string;
  tileColor: string; // Add tileColor prop
}

export default function Tile({ number, names, highlight, image, tileColor }: Props) {
  const className: string = [
    names,
    "tile",
    number % 2 === 0 ? "black-tile" : "white-tile",
    highlight && "tile-highlight",
    tileColor // Add tileColor to className array
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
    </div>
  );
}