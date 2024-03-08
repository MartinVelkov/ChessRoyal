import * as React from "react";
import Referee from "../../ChessBoardComponents/Referee/Referee";
import "./CssForThePages/Chess.css";
import { Link } from "react-router-dom";
// import Buttons from "../../ChessBoardComponents/buttons/modButtons"
import Button from "../../ChessBoardComponents/buttons/settings-button"

export const Chess = () => {
  return (
    <div className="main">
      <div className="paged">
        <div className="Chessboard">
          <Referee />
        </div>
        <div className="settings-button">
          <Button></Button>
        </div>
        <div className="but">
          <button id="Play-button" className="Play-button">
            <Link className="Play" to="/ChessPage">
              Играй
            </Link>
          </button>
          {/* <Buttons className="buttons" margin-top="500px"></Buttons> */}
        </div>
      </div>
    </div>
  );
};
