import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../../helpers/checkWinner";

function Grid({ numberOfCard }){
    const [board, setBoard] = useState(Array(numberOfCard).fill(""));
    const [turn, setTurn] = useState(true);   // true : false
    const [winner, setWinner] = useState(null);
    
    function play(index){
        if(turn == true){
            board[index] = "O";
        } else {
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X");
        if(win) {
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function resetGame() {
        setBoard(Array(numberOfCard).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return ( 
        <div className="grid-wrapper">
            {
                winner && (
                   <>
                     <h1 className="turn-highlight" >Winner Is {winner}</h1>
                     <button  className="reset" onClick={resetGame}>  Reset  </button>
                   </>
                )
            }

            <h1 className="turn-highlight">
                    Current Turn : {(turn) ? 'O' : 'X'}
            </h1>

             <div className="grid">
               {board.map((_el, idx) => <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={_el} index={idx}/>)}
        </div>
        </div>
       
    )

}

export default Grid;