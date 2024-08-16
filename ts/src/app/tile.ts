
import styles from "@/app/page.module.css"

export const MINE = -1;

export class Tile
{
      internalState: number;
      externalState: "blank" | "mine" | "hitMine" | "num" | "flag" | "wrongFlag";
      divClassSetter;

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

      /**
       * returns true if tile wasn't revealed before
       */
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
                        this.externalState = "mine";
                  else
                        this.externalState = "num";
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