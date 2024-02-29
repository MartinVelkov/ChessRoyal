import { useRef, useState, useEffect } from "react";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import { PieceType, TeamType } from "../../Types";
import Chessboard from "../Chessboard/Chessboard";
import { io, Socket } from "socket.io-client";
import { invertChessboard } from "../algorythm/algorythm";

interface Player {
  name: any;
  eloBlits: number;
  eloBullet: number;
  eloRapid: number;
  eloClassic: number;
}

interface ChessPiece {
  image: string;
  position: any;
  type: string;
  team: "b" | "w";
  possibleMoves: number[];
}

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  console.log("Marto test", board);

  useEffect(() => {
    socketRef.current = io("https://chess-api.noit.eu"); // Change the URL to your server
    const socket = socketRef.current;

    document.getElementById("Play-button")?.addEventListener("click", () => {
      console.log("testing a button");
      // Emit 'play' event when the button is clicked
      socket.emit("play", "PlayerName"); // You can replace 'PlayerName' with the actual player name
    });

    socket.on("connect", () => {
      console.log("connected!");
      console.log("New player connected: ", socket.id);

      // When play button is pressed
      socket.on("play", (playerName: string) => {
        console.log(`${playerName} pressed the play button.`);
        // Notify other player that someone has pressed the play button
        // socket.emit('playPressed', playerName);
      });
      console.log("first Socket failed");
      
      // Handle 'playPressed' event from the server
      socket.on("playPressed", (playerName: string) => {
        console.log(`${playerName} pressed the play button.`);
      });

      console.log("second Socket failed");

      // Example logic to handle playing the game
      socket.on("startGame", (players: Player[]) => {
        const [player1, player2] = players;
        // Emit the winner to both players
      });
      console.log("third Socket failed");
    });

    // Listen for move events from the server
    socketRef.current.on("move", (data) => {
      console.log("Received array: ", data);

      const invertedChessboard: ChessPiece[] = invertChessboard(data);
      console.log(invertedChessboard);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    // If the playing piece doesn't have any moves return

    if (playedPiece.possibleMoves === undefined) return false;

    // Prevent the inactive team from playing
    if (playedPiece.team === TeamType.OUR && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.OPPONENT && board.totalTurns % 2 !== 0)
      return false;

    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves?.some(
      (m) => m instanceof Position && m.samePosition(destination)
    );

    if (!validMove) return false;

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    if (socketRef.current) {
      socketRef.current.emit("move", board.pieces);
    }

    // playMove modifies the board thus we
    // need to call setBoard
    setBoard(() => {
      const clonedBoard = board.clone();
      clonedBoard.totalTurns += 1;
      // Playing the move
      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      if (clonedBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove("hidden");
      }

      return clonedBoard;
    });

    // This is for promoting a pawn
    let promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((previousPromotionPawn) => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }

    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((previousBoard) => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team, true)
          );
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      clonedBoard.calculateAllMoves();

      return clonedBoard;
    });

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  }

  function restartGame() {
    checkmateModalRef.current?.classList.add("hidden");
    setBoard(initialBoard.clone());
  }

  return (
    <>
      {/* <p style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Total turns: {board.totalTurns}</p> */}
      <div className="modal hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            alt=""
            src={`/assets/images/rook_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            alt=""
            src={`/assets/images/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            alt=""
            src={`/assets/images/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            alt=""
            src={`/assets/images/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="checkmate-body">
            <span>
              The winning team is{" "}
              {board.winningTeam === TeamType.OUR ? "white" : "black"}!
            </span>
            <button onClick={restartGame}>Play again</button>
          </div>
        </div>
      </div>
      <Chessboard
        playMove={playMove}
        pieces={board.pieces}
        socket={socketRef.current}
      />
    </>
  );
}
