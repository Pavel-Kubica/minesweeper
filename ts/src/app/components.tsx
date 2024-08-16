'use client';

import styles from "@/app/page.module.css";
import {useState} from "react";
import {Board} from "@/app/board";
import {Game} from "@/app/game";

export function UITile({tileId, className, clickCallback})
{
    return <div key={tileId}
                id={tileId}
                className={className}
                onMouseUp={clickCallback}
            >
    </div>
}

export function GameBoard({game, children})
{
    const [a, update] = useState(0);
    const rerender = () => update(a + 1);

    const [timer, setTimer] = useState(0);
    return (
        <div id="board"
             className={styles.board}
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             onMouseUp={() =>
             {
                 if (game.timer === undefined)
                 {
                     game.startTimer(setTimer);
                 }
                 rerender();
             }}
        >
            {
                game.board.data.map(
                    function(tile, index)
                    {
                        return <UITile key={index} tileId={index} className={tile.getClass()}
                                       clickCallback={game.handleClick(index)}/>;
                    })
            }
            {children}
            <h1>{timer}</h1>
        </div>
    )
}

export function GameWindow({width, height, mines, children})
{
    // Have to create Game here so it doesn't get remade after every click
    let board = new Board(width, height, mines);
    let game = new Game(board);
    return (
    <div className="game-window"
         style={{width: width * 32 + "px", height: height * 32 + "px"}}
    >
        <GameBoard game={game}>
        </GameBoard>
        {children}
    </div>
    )
}

const DEFAULT_WIDTH = 30;
const MAX_WIDTH = 50;
const DEFAULT_HEIGHT = 16;
const MAX_HEIGHT = 50;
const DEFAULT_MINES = 99;

function InputField({value, setValue, validationFunction})
{
    return (
        <input value={value}
               onChange={(event) =>
               {
                   if (validationFunction(event.target.value))
                       setValue(event.target.value);
               }}
        />
    )
}

export function App({children})
{
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [mines, setMines] = useState<number>(DEFAULT_MINES)
    const [gameWindow, setGameWindow] = useState([]);

    return (
        <>
        <label>
            Width:
            <InputField value={width} setValue={setWidth} validationFunction={value => value > 0 && value <= MAX_WIDTH}/>
        </label>
        <br/>
        <label>
            Height:
            <InputField value={height} setValue={setHeight} validationFunction={value => value > 0 && value <= MAX_HEIGHT}/>
        </label>
        <br/>
        <label>
            Mines:
            <InputField value={mines} setValue={setMines} validationFunction={value => value > 0 && value <= width * height - 10}/>
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