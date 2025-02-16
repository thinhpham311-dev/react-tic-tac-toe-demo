import { useState } from 'react'
import { Board } from './components/Board';
import './App.css'
import { calculateWinner } from './helpers';
import styled from "styled-components";

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameState = styled.div`
	width: 200px;
	margin: 20px auto;
`;

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [scores, setScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 });

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square !== null); // Check for draw

  const handleClick = (i: number) => {
    if (winner || currentSquares[i]) {
      return;
    }

    const timeInHistory = history.slice(0, stepNumber + 1);
    const squares = [...currentSquares];
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    if (step === 0 && stepNumber !== 0 && winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: (prevScores[winner as "X" | "O"] || 0) + 1,
      }));
    }

    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }


  return (
    <GameContainer>
      <Board squares={currentSquares} onClick={handleClick} />
      <GameState>
        <p>
          {winner ? `Winner: ${winner}` : isDraw ? 'Game is a Draw!' : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </p>
        <p>Score History:</p>
        <p>X: {scores.X}</p>
        <p>O: {scores.O}</p>
        <button onClick={() => jumpTo(0)}>Go to start</button>      </GameState>
    </GameContainer>
  )
}

export default App;
