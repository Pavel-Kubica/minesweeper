import {MINE, Tile} from "@/app/tile";
import styles from "@/app/page.module.css"

export class Board
{
    width: number;
    height: number;
    mines: number;
    minesPlaced: boolean;
    safeRevealed: number;
    data: Tile[];
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.mines = 0;
        this.minesPlaced = false;
        this.safeRevealed = 0;
        this.data = [];
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                this.data[this.toId(x, y)] = new Tile();
            }
        }
    }

    handleClick(tileId)
    {
        return function(event)
        {
            if (event.button === 0)
            {
                this.revealTile(tileId);
            }
            else if (event.button === 2)
            {
                this.flagTile(tileId);
            }
        }.bind(this);
    }

    revealTile(tileId)
    {
        if (!this.minesPlaced)
        {
            this.placeMines(tileId, 10);
            this.minesPlaced = true;
        }
        this.plainRevealWithWinCheck(tileId)
        if (this.data[tileId].isZero())
        {
            this.rippleReveal(tileId);
        }
    }
    plainRevealWithWinCheck(tileId)
    {
        if (!this.data[tileId].playerReveal())
            return;
        if (this.data[tileId].hasMine())
            this.lose();
        else
        {
            if (++this.safeRevealed >= this.width * this.height - this.mines)
                this.win();
        }
    }
    flagTile(tileId)
    {
        this.data[tileId].flag();
    }
    placeMines(tileId: number, mines: number)
    {
        this.mines = mines;
        let protectedTiles = this.getSurroundingTiles(tileId);
        protectedTiles.push(tileId);
        for (let i = 0; i < mines; i++)
        {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            let id = this.toId(x, y);
            if (!this.data[id].hasMine() && !protectedTiles.includes(id))
            {
                this.data[id].internalState = MINE;
            }
            else
            {
                i--;
            }
        }
        this.calculateAllNumbers();
    }
    rippleReveal(tileId: number, force: boolean = false)
    {
        this.plainRevealWithWinCheck(tileId);
        if (!force && !this.data[tileId].isZero())
            return;
        let surroundingTiles = this.getSurroundingTiles(tileId);
        for (const surroundingTile of surroundingTiles)
        {
            if (this.data[surroundingTile].externalState === "blank")
                this.rippleReveal(surroundingTile);
        }
    }

    validTile(tileId)
    {
        return tileId >= 0 && tileId < this.width * this.height;

    }

    calculateAllNumbers()
    {
        for (let x = 0; x < this.width; x++)
        {
            for (let y = 0; y < this.height; y++)
            {
                let tileId = this.toId(x, y);
                if(!this.data[tileId].hasMine())
                {
                    this.data[tileId].internalState = this.getMatchingSurrounding(tileId, (tileId) => this.data[tileId].hasMine()) .length;
                }
            }
        }
    }
    getMatchingSurrounding(tileId: number, check: (tileId: number) => boolean): number[]
    {
        return this.getSurroundingTiles(tileId).filter(this.validTile.bind(this)).filter(check);
    }
    win()
    {
        alert("WON");
        this.revealAllMines();
    }
    lose()
    {
        alert("LOST")
        this.revealAllMines();
    }
    revealAllMines()
    {
        for (const tile of this.data)
        {
            if (tile.internalState === MINE)
            {
                tile.autoReveal();
            }
        }
    }
    toId(x: number, y: number): number
    {
        return x * this.height + y;
    }
    fromId(id: number): [number, number]
    {
        return [Math.floor(id / this.height), id % this.height];
    }
    getSurroundingTiles(tileId)
    {
        let [x, y] = this.fromId(tileId);
        return [
            this.toId(x-1, y-1),
            this.toId(x, y-1),
            this.toId(x+1, y-1),
            this.toId(x-1, y),
            this.toId(x+1, y),
            this.toId(x-1, y+1),
            this.toId(x, y+1),
            this.toId(x+1, y+1)
        ].filter(this.validTile.bind(this));
    }
}