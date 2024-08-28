
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

      setExternalState(externalState: "blank" | "mine" | "hitMine" | "num" | "flag" | "wrongFlag"): void
      {
            this.externalState = externalState;
            this.divClassSetter(this.getClass())
      }

      /**
       * returns true if tile wasn't revealed before
       */
      playerReveal(): boolean
      {
            if (this.externalState === "blank")
            {
                  if (this.hasMine())
                        this.setExternalState("hitMine")
                  else
                      this.setExternalState("num")
                  return true;
            }
            return false;
      }
      autoReveal(): void
      {
            if (this.externalState === "blank")
            {
                  if (this.internalState === MINE)
                        this.setExternalState("mine")
                  else
                        this.setExternalState("num")
            }
      }
      flag(): boolean
      {
            if (this.externalState === "blank")
                  this.setExternalState("flag");
            else if (this.externalState === "flag")
                  this.setExternalState("blank");
            else
                  return false;
            return true;
      }
}