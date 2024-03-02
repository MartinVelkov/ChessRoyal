// import { useRef, useState, useEffect } from "react";
// import "./Chessboard.css";
// import Tile from "../Tile/Tile";
// import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE } from "../../Constants";
// import { Piece, Position } from "../../models";
// // import { io, Socket } from "socket.io-client";

// let playerisWhite = true

// interface Props {
//   playMove: (piece: Piece, position: Position) => boolean;
//   pieces: Piece[];
//   // socket: Socket | null; // Add a prop for socket
// }

// export default function Chessboard({ playMove, pieces }: Props) {
//   const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
//   const [grabPosition, setGrabPosition] = useState<Position>(
//     new Position(-1, -1)
//   );

//   const chessboardRef = useRef<HTMLDivElement>(null);

//   const handleColorChange = () => {
//     const whiteColor = prompt("Enter new color for white tiles:") || "#ebecd0";
//     const blackColor = prompt("Enter new color for black tiles:") || "#779556";
//     const whiteTiles = document.querySelectorAll(".white-tile") as NodeListOf<HTMLElement>;
//     const blackTiles = document.querySelectorAll(".black-tile") as NodeListOf<HTMLElement>;

//     whiteTiles.forEach(tile => (tile.style.backgroundColor = whiteColor));
//     blackTiles.forEach(tile => (tile.style.backgroundColor = blackColor));
//   };

//   function grabPiece(e: React.MouseEvent) {
//     const element = e.target as HTMLElement;
//     const chessboard = chessboardRef.current;
//     if (element.classList.contains("chess-piece") && chessboard) {
//       const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
//       const grabY = Math.abs(
//         Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
//       );

//       setGrabPosition(new Position(grabX, grabY));

//       const x = e.clientX - GRID_SIZE / 2;
//       const y = e.clientY - GRID_SIZE / 2;
//       element.style.position = "absolute";
//       element.style.left = `${x}px`;
//       element.style.top = `${y}px`;

//       setActivePiece(element);

//       // Emit grabbing action to synchronize with other players
//       // if (socket && grabPosition.x !== -1 && grabPosition.y !== -1) {
//       //   socket.emit("grab", { grabX: grabPosition.x, grabY: grabPosition.y });
//       // }
//     }
//   }

//   function movePiece(e: React.MouseEvent) {
//     const chessboard = chessboardRef.current;
//     if (activePiece && chessboard) {
//       // Calculate the boundaries for piece movement
//       const minX = chessboard.offsetLeft - 25;
//       const minY = chessboard.offsetTop - 25;
//       const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
//       const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
//       const x = e.clientX - 50;
//       const y = e.clientY - 50;
//       activePiece.style.position = "absolute";

//       // Ensure the piece stays within the boundaries
//       if (x < minX) {
//         activePiece.style.left = `${minX}px`;
//       } else if (x > maxX) {
//         activePiece.style.left = `${maxX}px`;
//       } else {
//         activePiece.style.left = `${x}px`;
//       }

//       if (y < minY) {
//         activePiece.style.top = `${minY}px`;
//       } else if (y > maxY) {
//         activePiece.style.top = `${maxY}px`;
//       } else {
//         activePiece.style.top = `${y}px`;
//       }
//     }
//   }

//   function dropPiece(e: React.MouseEvent) {
//     const chessboard = chessboardRef.current;
//     if (activePiece && chessboard) {
//       const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
//       const y = Math.abs(
//         Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
//       );

//       const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

//       if (currentPiece) {
//         let success = playMove(currentPiece.clone(), new Position(x, y));

//         if (socket && grabPosition.x !== -1 && grabPosition.y !== -1) {
//           socket.emit("move", {
//             piece: currentPiece.clone(),
//             to: new Position(x, y)
//           });
//         } else {
//           // Reset piece position if move is not successful
//           activePiece.style.position = "relative";
//           activePiece.style.removeProperty("top");
//           activePiece.style.removeProperty("left");
//         }
//       }
//       setActivePiece(null);
//     }
//   }

//   let listadder = [];

//   let pawnW = 'url("assets/images/pawn_w.png")';
//   let pawnB = 'url("assets/images/pawn_b.png")';
//   let bishopW = 'url("assets/images/bishop_w.png")';
//   let bishopB = 'url("assets/images/bishop_b.png")';
//   let rookW = 'url("assets/images/rook_w.png")';
//   let rookB = 'url("assets/images/rook_b.png")';
//   let queenW = 'url("assets/images/queen_w.png")';
//   let queenB = 'url("assets/images/queen_b.png")';
//   let princeW = 'url("assets/images/prince_w.png")';
//   let princeB = 'url("assets/images/prince_b.png")';
//   let princessW = 'url("assets/images/princess_w.png")';
//   let princessB = 'url("assets/images/princess_b.png")';
//   let knightW = 'url("assets/images/knight_w.png")';
//   let knightB = 'url("assets/images/knight_b.png")';
//   let kingsW = 'url("assets/images/king_w.png")';
//   let kingsB = 'url("assets/images/king_b.png")';

//   if (
//     activePiece?.style.backgroundImage === pawnW ||
//     activePiece?.style.backgroundImage === pawnB
//   ) {
//     listadder.push("");
//     // console.log( "" );
//   } else if (
//     activePiece?.style.backgroundImage === bishopW ||
//     activePiece?.style.backgroundImage === bishopB
//   ) {
//     listadder.push("B");
//     // console.log("B");
//   } else if (
//     activePiece?.style.backgroundImage === rookW ||
//     activePiece?.style.backgroundImage === rookB
//   ) {
//     listadder.push("R");
//     // console.log("R");
//   } else if (
//     activePiece?.style.backgroundImage === queenW ||
//     activePiece?.style.backgroundImage === queenB
//   ) {
//     listadder.push("Q");
//     // console.log("Q");
//   } else if (
//     activePiece?.style.backgroundImage === princeW ||
//     activePiece?.style.backgroundImage === princeB
//   ) {
//     listadder.push("PC");
//     // console.log("PC");
//   } else if (
//     activePiece?.style.backgroundImage === knightW ||
//     activePiece?.style.backgroundImage === knightB
//   ) {
//     listadder.push("N");
//     // console.log("N");
//   } else if (
//     activePiece?.style.backgroundImage === princessW ||
//     activePiece?.style.backgroundImage === princessB
//   ) {
//     listadder.push("PS");
//     // console.log("PS");
//   } else if (
//     activePiece?.style.backgroundImage === kingsW ||
//     activePiece?.style.backgroundImage === kingsB
//   ) {
//     listadder.push("K");
//     // console.log("K");
//   }

//   let board = [];

//   if (!playerisWhite) {
//     for (let j = 0; j < VERTICAL_AXIS.length; j++) {
//       for (let i = HORIZONTAL_AXIS.length - 1; i >= 0 ; i--) {
//         const number = j + i + 2;
//         const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
//         let image = piece ? piece.image : undefined;

//         let currentSquare = String(VERTICAL_AXIS[j]) + String(HORIZONTAL_AXIS[i]);

//         let currentPiece =
//           activePiece != null
//             ? pieces.find((p) => p.samePosition(grabPosition))
//             : undefined;
//         let highlight = currentPiece?.possibleMoves
//           ? currentPiece.possibleMoves.some((p) =>
//               p.samePosition(new Position(i, j))
//             )
//           : false;

//           const tileColor = number % 2 === 0 ? "black-tile" : "white-tile";

//         board.push(
//           <Tile
//             key={`${j},${i}`}
//             image={image}
//             names={currentSquare}
//             number={number}
//             highlight={highlight}
//             tileColor={tileColor}
//           />
//         );

//         let test1 = Boolean(
//           currentPiece?.position.y === Number(VERTICAL_AXIS[j])
//         );
//         let test2 = Boolean(
//           currentPiece?.position.x === Number(HORIZONTAL_AXIS[i])
//         );

//         if (test1 && test2) {
//           console.log("ssss");
//         }
//       }
//     }

//   } else {
//     for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
//       for (let i = 0; i < HORIZONTAL_AXIS.length ; i++) {
//         const number = j + i + 2;
//         const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
//         let image = piece ? piece.image : undefined;

//         let currentSquare = String(VERTICAL_AXIS[j]) + String(HORIZONTAL_AXIS[i]);

//         let currentPiece =
//           activePiece != null
//             ? pieces.find((p) => p.samePosition(grabPosition))
//             : undefined;
//         let highlight = currentPiece?.possibleMoves
//           ? currentPiece.possibleMoves.some((p) =>
//               p.samePosition(new Position(i, j))
//             )
//           : false;

//           const tileColor = number % 2 === 0 ? "black-tile" : "white-tile";

//         board.push(
//           <Tile
//             key={`${j},${i}`}
//             image={image}
//             names={currentSquare}
//             number={number}
//             highlight={highlight}
//             tileColor={tileColor}
//           />
//         );

//         let test1 = Boolean(
//           currentPiece?.position.y === Number(VERTICAL_AXIS[j])
//         );
//         let test2 = Boolean(
//           currentPiece?.position.x === Number(HORIZONTAL_AXIS[i])
//         );

//         if (test1 && test2) {
//           console.log("ssss");
//         }
//       }
//     }
//   }

//   useEffect(() => {
//     if (socket) {
//       // Listen for grab events from other players
//       socket.on("grab", (data: { grabX: number; grabY: number }) => {
//         console.log("grabed!");
//         setGrabPosition(new Position(data.grabX, data.grabY));
//       });

//       // Listen for move events from other players
//       socket.on("move", (data: { piece: Piece; to: Position }) => {
//         console.log("moved!");
//         playMove(data.piece, data.to);
//       });
//     }
//   }, [socket, playMove]);

//   return (
//     <>
//       <div
//         onMouseMove={(e) => movePiece(e)}
//         onMouseDown={(e) => grabPiece(e)}
//         onMouseUp={(e) => dropPiece(e)}
//         id="chessboard"
//         ref={chessboardRef}
//       >
//         {board}
//       </div>
//       <div>
//         <img src="" alt="Change Tile Colors" onClick={handleColorChange} />
//       </div>
//     </>
//   );
// }

import { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE } from "../../Constants";
import { Piece, Position } from "../../models";
import Brightness5Icon from '@mui/icons-material/Brightness5';

interface Props {
  playMove: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}

export default function Chessboard({ playMove, pieces }: Props) {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>(
    new Position(-1, -1)
  );
  const chessboardRef = useRef<HTMLDivElement>(null);

  const colorTemplates = [
    { name: "Default", white: "#ebecd0", black: "#779556" },
    { name: "Light", white: "#f0f0f0", black: "#d3d3d3" },
    { name: "Dark", white: "#ffffff", black: "#000000" },
    // Add more color templates as needed
  ];

  const handleColorChange = () => {
    const templateNames = colorTemplates
      .map((template) => template.name)
      .join("\n");
    const selectedTemplateName =
      prompt(`Choose a color template:\n${templateNames}`) || "Default";
    const selectedTemplate = colorTemplates.find(
      (template) => template.name === selectedTemplateName
    );

    if (selectedTemplate) {
      const whiteTiles = document.querySelectorAll(
        ".white-tile"
      ) as NodeListOf<HTMLElement>;
      const blackTiles = document.querySelectorAll(
        ".black-tile"
      ) as NodeListOf<HTMLElement>;

      whiteTiles.forEach(
        (tile) => (tile.style.backgroundColor = selectedTemplate.white)
      );
      blackTiles.forEach(
        (tile) => (tile.style.backgroundColor = selectedTemplate.black)
      );
    } else {
      alert("Invalid template name. Using default colors.");
    }
  };

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      setGrabPosition(new Position(grabX, grabY));

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

      if (currentPiece) {
        let success = playMove(currentPiece.clone(), new Position(x, y));

        if (!success) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      setActivePiece(null);
    }
  }
  let listadder = [];

  let pawnW = 'url("assets/images/pawn_w.png")';
  let pawnB = 'url("assets/images/pawn_b.png")';
  let bishopW = 'url("assets/images/bishop_w.png")';
  let bishopB = 'url("assets/images/bishop_b.png")';
  let rookW = 'url("assets/images/rook_w.png")';
  let rookB = 'url("assets/images/rook_b.png")';
  let queenW = 'url("assets/images/queen_w.png")';
  let queenB = 'url("assets/images/queen_b.png")';
  let princeW = 'url("assets/images/prince_w.png")';
  let princeB = 'url("assets/images/prince_b.png")';
  let princessW = 'url("assets/images/princess_w.png")';
  let princessB = 'url("assets/images/princess_b.png")';
  let knightW = 'url("assets/images/knight_w.png")';
  let knightB = 'url("assets/images/knight_b.png")';
  let kingsW = 'url("assets/images/king_w.png")';
  let kingsB = 'url("assets/images/king_b.png")';

  if (
    activePiece?.style.backgroundImage === pawnW ||
    activePiece?.style.backgroundImage === pawnB
  ) {
    listadder.push("");
    // console.log( "" );
  } else if (
    activePiece?.style.backgroundImage === bishopW ||
    activePiece?.style.backgroundImage === bishopB
  ) {
    listadder.push("B");
    // console.log("B");
  } else if (
    activePiece?.style.backgroundImage === rookW ||
    activePiece?.style.backgroundImage === rookB
  ) {
    listadder.push("R");
    // console.log("R");
  } else if (
    activePiece?.style.backgroundImage === queenW ||
    activePiece?.style.backgroundImage === queenB
  ) {
    listadder.push("Q");
    // console.log("Q");
  } else if (
    activePiece?.style.backgroundImage === princeW ||
    activePiece?.style.backgroundImage === princeB
  ) {
    listadder.push("PC");
    // console.log("PC");
  } else if (
    activePiece?.style.backgroundImage === knightW ||
    activePiece?.style.backgroundImage === knightB
  ) {
    listadder.push("N");
    // console.log("N");
  } else if (
    activePiece?.style.backgroundImage === princessW ||
    activePiece?.style.backgroundImage === princessB
  ) {
    listadder.push("PS");
    // console.log("PS");
  } else if (
    activePiece?.style.backgroundImage === kingsW ||
    activePiece?.style.backgroundImage === kingsB
  ) {
    listadder.push("K");
    // console.log("K");
  }

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
      let image = piece ? piece.image : undefined;

      let currentSquare = String(VERTICAL_AXIS[j]) + String(HORIZONTAL_AXIS[i]);

      let currentPiece =
        activePiece != null
          ? pieces.find((p) => p.samePosition(grabPosition))
          : undefined;
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            p.samePosition(new Position(i, j))
          )
        : false;

      const tileColor = number % 2 === 0 ? "black-tile" : "white-tile";

      board.push(
        <Tile
          key={`${j},${i}`}
          image={image}
          names={currentSquare}
          number={number}
          highlight={highlight}
          tileColor={tileColor}
        />
      );
    }
  }

  return (
    <>
      <div>
        <button onClick={handleColorChange}></button>
      </div>

      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  );
}
