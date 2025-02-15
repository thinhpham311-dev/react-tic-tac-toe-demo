import { useState } from 'react'
import { Board } from './components/Board';
import './App.css'
import { calculateWinner } from './helpers';


function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i: number) => {
    const timeInHistory = history.slice(0, stepNumber + 1);

    const current = timeInHistory[stepNumber];

    const squares = [...current];
    // if user click an occupied square or if game is won, return
    if (winner || squares[i]) return;

    // Put an X or an O in the clicked square
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);

    setXisNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }


  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <p>{winner ? `Winner: ${winner}` : `Next Player ${xIsNext ? 'X' : 'O'}`}</p>
      <button onClick={() => jumpTo(0)}> Go to start</button>
    </>
  )
}

export default App
