import { ChessTimer} from "../Timer/3Min";
import Referee from "../Referee/Referee";
import "./chessboard.css";
import { useRef } from "react";

export function ChessPage() {
  const settings = document.getElementById("theme");

  if (settings) {
    settings.classList.remove("theme-changer-hidden");
  }

  return (
    <div className="pager">
      <div className="Chessboard-Chesspage">
        <Referee />
      </div>
      <div className="Timer">
        <ChessTimer />
      </div>
    </div>
  );
}
