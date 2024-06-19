
export default function GameBoard({ onSelectSquare, board }) {

    // let gameBoard = initialGameBoard;

    // for(const turn of turns){
    //     const {square, player} = turn;
    //     const {row, col} = square;

    //     gameBoard[row][col] = player;
    // }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectedSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updaedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updaedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updaedBoard;
    //     });

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board" >
            {board.map((row, index) =>
            (<li key={index}>
                <ol>
                    {row.map((playerSymbol, colIndex) =>
                    (<li key={colIndex}>
                        <button onClick={()=>onSelectSquare(index, colIndex)} disabled={playerSymbol !== null}>
                            {playerSymbol}
                            </button>
                    </li>))}
                </ol>
            </li>))}
        </ol>)
}