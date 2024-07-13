'use client';

import styles from "@/app/page.module.css";
import {useState} from "react";
import {Board} from "@/app/board";

export function TileCmpnt({tileId, className, clickCallback})
{
    return <div key={tileId}
                id={tileId}
                className={className}
                onMouseUp={clickCallback}
            >
    </div>
}

export function BoardCmpnt({gameBoard, children})
{
    const [clicks, setClicks] = useState(0);
    return (
        <div id="game"
             className={styles.game}
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             onMouseUp={() => setClicks(clicks + 1)}
        >
            {
                gameBoard.data.map(
                    function(tile, index)
                    {
                        return <TileCmpnt key={index} tileId={index} className={tile.getClass()}
                                          clickCallback={gameBoard.handleClick(index)}/>;
                    })
            }
            {children}
            <h1>{clicks}</h1>
        </div>
    )
}

export function GameWindow({width, height, children})
{
    let gameBoard = new Board(width, height);
    console.log("drawing game window");
    return (
    <div className="game-window"
         style={{width: width * 32 + "px", height: height * 32 + "px"}}
    >
        <BoardCmpnt gameBoard={gameBoard}>
        </BoardCmpnt>
    </div>
    )
}