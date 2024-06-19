export default function GameOver({ winner, reStartGame }) {

    console.log({ winner })
    return <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>{winner} won</p>}
        {!winner && <p>Match Draw</p>}

        <p>
            <button onClick={reStartGame}>Rematch!</button>
        </p>
    </div>
}