import {Tile} from "@/app/definitions";
import styles from "./page.module.css"

export function TileDiv({tile, x, y})
{
    return <div className={styles[tile.state] + " tile"}
                id={"" + x + "_" + y}></div>
}

function blankTile(): Tile
{
    return new Tile(0, "blank");
}


export function GenerateEmptyBoard({width, height})
{
    let tiles = []
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            tiles.push({i, j});
        }
    }
    return (
        <div id="game" className={styles.game} style={ {width: width*32 + "px", height: height*32 + "px"} }>
            {tiles.map( (pos) => TileDiv({tile: blankTile(), x: pos.i, y: pos.j}) )}
        </div>
    )
}