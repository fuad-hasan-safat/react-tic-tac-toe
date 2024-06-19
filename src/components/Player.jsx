import { useState } from "react"

export default function Player({name, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(name);
    const  [isEdit, setIsEdit] = useState(false)

    function handleEditClick(){
        setIsEdit((previousValue)=> !previousValue);

        if(isEdit){
            onChangeName(symbol, playerName)
        }
    }
    
    function handleChange(event){
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>

    if(isEdit){
        editablePlayerName = <input type="text" onChange={handleChange} required value={playerName} />
    }
    return (
        <li className={isActive? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEdit?'Save':'Edit'}</button>
            

        </li>
    )
}