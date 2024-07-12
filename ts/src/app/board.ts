import {fromId, getSurroundingTiles, Tile, toId} from "@/app/tile";
import styles from "@/app/page.module.css"

export class Board
{
    width: number;
    height: number;
    data: Tile[];
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.data = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.data[toId(x, y)] = new Tile();
            }
        }
    }
    placeMines(tileId: string, mines: number)
    {
        let protectedTiles = getSurroundingTiles(tileId).filter(this.validTile.bind(this));
        protectedTiles.push(tileId);

    }
    rippleReveal(tileId: string, force: boolean = false)
    {
        let tile = this.data[tileId];
        tile.reveal();
        document.getElementById(tileId).classList.replace(styles.blank, tile.getClass());
        if (!force && this.data[tileId].value !== 0)
            return;
        let surroundingTiles = getSurroundingTiles(tileId).filter(this.validTile.bind(this));
        for (const surroundingTile of surroundingTiles) {
            if (this.data[surroundingTile].state === "blank")
                this.rippleReveal(surroundingTile);
        }
    }

    validTile(tileId)
    {
        let [x, y] = fromId(tileId);
        if (x < 0 || x >= this.width ||
            y < 0 || y >= this.height)
            return false;
        return true;

    }
}