import { ChessTimer } from "../Timer/3Min";
import Referee from "../Referee/Referee";
import "./chessboard.css";
import { Board } from "../../models/Board";
import { useState } from "react";
import { initialBoard } from "../../Constants";

export function ChessPage() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const desicion: boolean = board.totalTurns % 2 === 0;

  return (
    <div className="pager">
      <div className="Chessboard-Chesspage">
        <Referee />
      </div>
      <div className="Timer">
        <ChessTimer isPlayer1Turn={desicion} />
      </div>
    </div>
  );
}
