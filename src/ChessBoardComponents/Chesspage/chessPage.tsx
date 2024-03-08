import { ChessTimer } from "../Timer/3Min";
import Referee from "../Referee/Referee";
import "./chessboard.css";


export function ChessPage() {

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
