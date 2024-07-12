'use client';

import styles from "@/app/page.module.css";
import {blankTile, generateEmptyData, toId} from "@/app/gamedata";

export function TileDiv({tile, x, y})
{
    const tileId = toId(x, y);
    return <div key={tileId}
                className={styles[tile.getClass()] + " tile"}
                id={tileId}
                onClick={(event) => {
                    if (event.button === 0)
                        tile.reveal();
                    else if (event.button === 2)
                        tile.flag();
                }}></div>
}

export function GenerateEmptyBoard({width, height})
{
    generateEmptyData(width, height);
    let tiles = []
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            tiles.push({x: x, y: y});
        }
    }
    return (
        <div id="game" className={styles.game} style={ {width: width*32 + "px", height: height*32 + "px"} }>
            {tiles.map( (pos) => TileDiv({tile: blankTile(), x: pos.x, y: pos.y}) )}
        </div>
    )
}