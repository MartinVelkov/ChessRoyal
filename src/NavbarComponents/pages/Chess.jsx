import * as React from "react";
import Referee from "../../ChessBoardComponents/Referee/Referee";
import "./CssForThePages/Chess.css";

export const Chess = () => {
  return (
    <div className="main">
      <div className="paged">
        <div className="Chessboard">
          <Referee />
        </div>

        <div>
          <button className="Play-button">Играй</button>
        </div>
      </div>
    </div>
  );
};
