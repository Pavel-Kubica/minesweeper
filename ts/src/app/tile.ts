
import styles from "@/app/page.module.css"

export const MINE = -1;

export class Tile
{
      internalState: number;
      externalState: "blank" | "mine" | "hitMine" | "num" | "flag" | "wrongFlag";

      constructor(state: "blank" | "mine" | "hitMine" | "num" | "flag" | "wrongFlag" = "blank", value: number = 0)
      {
            this.internalState = value;
            this.externalState = state;
      }

      hasMine(): boolean
      {
            return this.internalState === MINE;
      }
      isFlagged(): boolean
      {
            return this.externalState === "flag";
      }

      isRevealed(): boolean
      {
            return this.externalState !== "flag" && this.externalState !== "blank";
      }

      isZero(): boolean
      {
            return this.internalState === 0;
      }

      getClass(): string
      {
            if (this.externalState === "num")
                  return styles["num" + this.internalState];
            return styles[this.externalState];
      }
      playerReveal(): boolean
      {
            if (this.externalState === "blank")
            {
                  if (this.hasMine())
                        this.externalState = "hitMine";
                  else
                        this.externalState = "num";
                  return true;
            }
            return false;
      }
      autoReveal(): void
      {
            if (this.externalState === "blank")
            {
                  if (this.internalState === MINE)
                        this.updateExternalState("mine")
                  else
                        this.updateExternalState("num");
            }
      }
      flag(): boolean
      {
            if (this.externalState === "blank")
                  this.externalState = "flag";
            else if (this.externalState === "flag")
                  this.externalState = "blank";
            else
                  return false;
            return true;
      }
}