'use client';

import styles from "@/app/page.module.css";
import {Tile, toId} from "@/app/tile";
import {Board} from "@/app/board";

let gameBoard;

export function TileDiv({tile, x, y})
{
    const tileId = toId(x, y);
    return <div key={tileId}
                className={styles[tile.getClass()] + " tile"}
                id={tileId}
                onClick={(event) => {
                    if (event.button === 0)
                    {
                        if (!tile.reveal() || tile.number === 0)
                        {
                            gameBoard.rippleReveal(x, y);
                        }
                    }
                    else if (event.button === 2)
                        tile.flag();
                }}></div>
}

export function GenerateEmptyBoard({width, height})
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