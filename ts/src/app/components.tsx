'use client';

import styles from "@/app/page.module.css";
import {Tile, toId} from "@/app/tile";
import {Board} from "@/app/board";
import {useState} from "react";

let gameBoard = new Board(0, 0);

export function TileDiv({tile, x, y})
{
    const tileId = toId(x, y);
    const [stateClass, setStateClass] = useState(styles["blank"]);
    return <div key={tileId}
                className={stateClass + " tile"}
                id={tileId}
                onClick={(event) => {

                    if (event.button === 0)
                    {
                        let newlyRevealed = tile.reveal();
                        if (newlyRevealed)
                        {
                            setStateClass(tile.getClass());
                        }
                        if (!newlyRevealed || tile.value === 0)
                        {
                            gameBoard.rippleReveal(tileId);
                        }
                    }
                    else if (event.button === 2)
                    {
                        if (tile.flag())
                            setStateClass(tile.getClass());
                    }
                }}></div>
}

export function EmptyBoard({width, height})
{
    gameBoard = new Board(width, height);
    let tiles = []
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            tiles.push({x: x, y: y});
        }
    }
    return (
        <div id="game" className={styles.game} style={ {width: width*32 + "px", height: height*32 + "px"} }>
            {tiles.map( (pos) => TileDiv({tile: new Tile(), x: pos.x, y: pos.y}) )}
        </div>
    )
}