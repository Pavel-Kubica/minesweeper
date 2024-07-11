
const MINE = -1;

export class Tile
{
      value: number;
      state: "blank" | "num" | "mine" | "hitMine" | "flag" | "wrongFlag";
      constructor(value: number, state: "blank" | "num" | "mine" | "hitMine" | "flag" | "wrongFlag")
      {
            this.value = value;
            this.state = state;
      }
}

export function tileClass(tile: Tile): string
{
      if (tile.state == "num")
            return "num" + tile.value;
      return tile.state;
}