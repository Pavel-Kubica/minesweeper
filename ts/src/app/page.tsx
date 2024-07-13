'use client';

import styles from "./page.module.css";
import {BoardCmpnt, TileCmpnt} from "@/app/components";
import {Board} from "@/app/board";

// todo load these from input
const WIDTH = 9;
const HEIGHT = 9;

export default function Home()
{
    let gameBoard = new Board(WIDTH, HEIGHT);
    return (
        <main className={styles.main}>
            <div className="game-window"
                 style={{width: WIDTH * 32 + "px", height: HEIGHT * 32 + "px"}}>
                <BoardCmpnt>
                {
                    gameBoard.data.map(
                        function(tile, index)
                        {
                            console.log(index);
                            return <TileCmpnt key={index} tileId={index} clickCallback={gameBoard.handleClick(index)}/>
                        })
                }
                </BoardCmpnt>
            </div>
        </main>
    );
}
