import {Tile} from "@/app/tile";

let gameData: Tile[] = [];

export function toId(x: number, y: number): string
{
    return "" + x + "_" + y;
}

export function blankTile(): Tile
{
    return new Tile(0, "blank");
}

export function generateEmptyData(width, height)
{
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            gameData[toId(x, y)] = blankTile();
        }
    }
}