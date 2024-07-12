import {fromId, getSurroundingTiles, Tile, toId} from "@/app/tile";

export class Board
{
    width: number;
    height: number;
    minesPlaced: boolean;
    data: Tile[];
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.minesPlaced = false;
        this.data = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.data[toId(x, y)] = new Tile();
            }
        }
    }
    placeMines(tileId: string, mines: number)
    {
        let protectedTiles = getSurroundingTiles(tileId).filter(this.validTile);
        protectedTiles.push(tileId);

    }
    rippleReveal(tileId: string)
    {
        let surroundingTiles = getSurroundingTiles(tileId).filter(this.validTile);
        
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