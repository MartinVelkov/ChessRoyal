// ChessTimer.js
import React, { useState, useEffect } from "react";
import { Board } from "../../models/Board";
import "./desing.css";
import { initialBoard } from "../../Constants";

interface ChessTimerProps {
  onTimerEnd: () => void; // Define prop for timer end callback
}

export function ChessTimer(isPlayer1Turn: boolean) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [player1Time, setPlayer1Time] = useState<number>(180); // 3 minutes in seconds
  const [player2Time, setPlayer2Time] = useState<number>(180); // 3 minutes in seconds
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (board.totalTurns % 2 !== 1) {
      handleMovePiece();
      setIsRunning(true);
      setIsPlayer1Turn(true);
    } else {
      handleMovePiece();
      setIsRunning(true);
      setIsPlayer1Turn(false);
    }

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (isPlayer1Turn) {
          setPlayer1Time((prevTime) => prevTime - 1);
        } else {
          setPlayer2Time((prevTime) => prevTime - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval); // Clear the interval properly
  }, [isRunning, isPlayer1Turn]);

  useEffect(() => {
    // Check for timer end
    if (player1Time === 0 || player2Time === 0) {
      setIsRunning(false); // Stop the timer
    }
  }, [player1Time, player2Time]);

  const handleStartPause = () => {
    setIsRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPlayer1Turn(true);
    setPlayer1Time(180);
    setPlayer2Time(180);
    setTimer(0);
  };

  const handleMovePiece = () => {
    if (isPlayer1Turn) {
      setPlayer1Time((prevTime) => prevTime + 2);
    } else {
      setPlayer2Time((prevTime) => prevTime + 2);
    }

    setIsPlayer1Turn((prevTurn) => !prevTurn);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
       <div>
        <div id='OPN'></div>

        <div className='shapeOPN'>
          <span>{formatTime(player1Time)}</span>
        </div>
  
        <div className='shapeOUR'>
          <span>{formatTime(player2Time)}</span>
        </div>

        <div id='OUR'></div> 
      </div>
    </div>
  );
}
