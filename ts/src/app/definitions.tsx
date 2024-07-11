
const MINE = -1;

export class Tile
{
      value: number;
      state: "blank" | "num" | "mine" | "hitMine" | "flag" | "wrongFlag";
}
