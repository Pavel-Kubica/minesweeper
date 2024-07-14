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
        <div id="board"
             className={styles.board}
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

export function GameWindow({width, height, mines, children})
{
    let gameBoard = new Board(width, height, mines);
    return (
    <div className="game-window"
         style={{width: width * 32 + "px", height: height * 32 + "px"}}
    >
        <BoardCmpnt gameBoard={gameBoard}>
        </BoardCmpnt>
    </div>
    )
}

const DEFAULT_WIDTH = 30;
const MAX_WIDTH = 50;
const DEFAULT_HEIGHT = 16;
const MAX_HEIGHT = 50;
const DEFAULT_MINES = 99;

export function Game({children})
{
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [mines, setMines] = useState<number>(DEFAULT_MINES)
    const [gameWindow, setGameWindow] = useState([]);

    return (
        <>
        <label>
            Width:
            <input type={"number"} value={width}
                   onChange={(event) =>
                   {
                       if (event.target.value > 0 && event.target.value <= MAX_WIDTH)
                            setWidth(event.target.value);
                   }}
            />
        </label>
        <br/>
        <label>
            Height:
            <input type={"number"} value={height}
                   onChange={(event) =>
                   {
                       if (event.target.value > 0 && event.target.value <= MAX_HEIGHT)
                           setHeight(event.target.value);
                   }}
            />
        </label>
        <br/>
        <label>
            Mines:
            <input type={"number"} value={mines}
                   onChange={(event) =>
                   {
                       if (event.target.value > 0 && event.target.value <= width * height - 10)
                           setMines(event.target.value);
                   }}
            />
        </label>
        <br/>
        <button type={"button"}
                onClick={() => setGameWindow(<GameWindow width={width} height={height} mines={mines}/>)}
        >
            Start
        </button>
            {gameWindow}
            {children}
        </>
    )
}