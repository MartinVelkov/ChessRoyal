import React, { useState, useEffect } from 'react';
import { Board } from '../../models/Board';
import "./desing.css"

export function ChessTimer() {
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [player1Time, setPlayer1Time] = useState(180); // 3 minutes in seconds
  const [player2Time, setPlayer2Time] = useState(180); // 3 minutes in seconds
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        if (isPlayer1Turn) {
          setPlayer1Time(prevTime => prevTime - 1);
        } else {
          setPlayer2Time(prevTime => prevTime - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval); // Clear the interval properly
  }, [isRunning, isPlayer1Turn]);
  
  const handleStartPause = () => {
    setIsRunning(prevRunning => !prevRunning);
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
      setPlayer1Time(prevTime => prevTime + 2);
    } else {
      setPlayer2Time(prevTime => prevTime + 2);
    }
    setIsPlayer1Turn(prevTurn => !prevTurn);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  
  if(Board.totaltuens){

  }

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
      {/* <div> */}
        {/* <span>Current Player: {isPlayer1Turn ? 'Player 1' : 'Player 2'}</span> */}
        {/* <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleMovePiece}>Move Piece</button> */}
      {/* </div> */}
    </div>
  );
}

