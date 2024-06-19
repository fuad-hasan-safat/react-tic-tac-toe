import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "./wining-combinations.js"
import GameOver from "./components/GameOver.jsx"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function driveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard

}

function deriveWinner(gameBoard, player) {
  console.log('drive winner call')
  console.log({ WINNING_COMBINATIONS })
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    console.log('inside for ', combination)
    console.log({ firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol })

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {

      console.log('winner found')

      winner = player[firstSquareSymbol];
      return winner;
    }



  }

}

function App() {
  const [player, setPlayer] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = driveGameBoard(gameTurns)
  console.log({ gameBoard })

  const winner = deriveWinner(gameBoard, player)

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {


    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        },
        ...prevTurns];

      return updatedTurns;

    })
  }


  function handleRematch() {
    setGameTurns([])
  }

  function handlePlyerNameChange(symbol, newName) {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">

        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol={'X'} isActive={activePlayer === 'X'} onChangeName={handlePlyerNameChange} />
          <Player name={PLAYERS.O} symbol={'O'} isActive={activePlayer === 'O'} onChangeName={handlePlyerNameChange} />
        </ol>

        {/* {winner && <p>{winner}, won this game.</p>} */}
        {(winner || hasDraw) && <GameOver reStartGame={handleRematch} winner={winner} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />


      </div>
      <Log turns={gameTurns} />

    </main>
  )
}

export default App
