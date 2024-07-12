
import styles from "@/app/page.module.css"

const MINE = -1;

export class Tile
{
      value: number;
      state: "blank" | "num" | "mine" | "hitMine" | "flag" | "wrongFlag";
      constructor(value: number = 0, state: "blank" | "num" | "mine" | "hitMine" | "flag" | "wrongFlag" = "blank")
      {
            this.value = value;
            this.state = state;
      }

      getClass(): string
      {
            if (this.state == "num")
                  return styles["num" + this.value];
            return styles[this.state];
      }
      reveal(): boolean
      {
            if (this.state === "blank")
            {
                  this.state = "num";
                  return true;
            }
            return false;
      }
      flag(): boolean
      {
            if (this.state === "blank")
                  this.state = "flag";
            else if (this.state === "flag")
                  this.state = "blank";
            else
                  return false;
            return true;
      }
}

export function toId(x: number, y: number): string
{
      return "" + x + "_" + y;
}

export function fromId(id: string): [number, number]
{
      return [+id.split('_')[0],+id.split('_')[1]];
}

export function getSurroundingTiles(tileId)
{
      let [x, y] = fromId(tileId);
      return [
            toId(x-1, y-1),
            toId(x, y-1),
            toId(x+1, y-1),
            toId(x-1, y),
            toId(x+1, y),
            toId(x-1, y+1),
            toId(x, y+1),
            toId(x+1, y+1)
      ];
}