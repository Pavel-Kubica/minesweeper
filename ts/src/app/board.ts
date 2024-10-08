import {MINE, Tile} from "@/app/tile";
import styles from "@/app/page.module.css"

export class Board
{
    width: number;
    height: number;
    mines: number;
    gameStarted: boolean;
    safeRevealed: number;
    data: Tile[];
    gameFinished: boolean;
    secondsCounter: number;
    timer;
    constructor(width: number, height: number, mines: number)
    {
        this.width = width;
        this.height = height;
        this.mines = mines;
        this.gameStarted = false;
        this.safeRevealed = 0;
        this.data = [];
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                this.data[this.toId(x, y)] = new Tile();
            }
        }
        this.gameFinished = false;
        this.secondsCounter = 0;
        this.timer = undefined;
    }
    handleClick(tileId)
    {
        return function(event)
        {
            if (this.gameFinished)
                return;
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
    startTimer(setter)
    {
        this.timer = setInterval(() => setter(++this.secondsCounter), 1000);
    }
    endTimer()
    {
        clearInterval(this.timer);
    }
    revealTile(tileId)
    {
        if (!this.gameStarted)
        {
            this.placeMines(tileId);
            this.gameStarted = true;
        }
        let newlyRevealed = this.plainRevealWithWinCheck(tileId);
        if (this.data[tileId].isZero())
        {
            this.rippleReveal(tileId);
        }
        else if (!newlyRevealed &&
                this.data[tileId].internalState === this.getMatchingSurrounding(tileId,(id) => this.data[id].isFlagged()).length) // The number of flags around this tile matches its number
            this.rippleReveal(tileId, true);
    }
    plainRevealWithWinCheck(tileId): boolean
    {
        if (!this.data[tileId].playerReveal())
            return false;
        if (this.data[tileId].hasMine())
            this.lose();
        else
        {
            if (++this.safeRevealed >= this.width * this.height - this.mines)
                this.win();
        }
        return true;
    }
    flagTile(tileId)
    {
        this.data[tileId].flag();
    }
    placeMines(tileId: number)
    {
        let protectedTiles = this.getSurroundingTiles(tileId);
        protectedTiles.push(tileId);
        for (let i = 0; i < this.mines; i++)
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
                    this.data[tileId].internalState = this.getMatchingSurrounding(tileId, (id) => this.data[id].hasMine()).length;
                }
            }
        }
    }
    getMatchingSurrounding(tileId: number, check: (tileId: number) => boolean): number[]
    {
        return this.getSurroundingTiles(tileId).filter(check);
    }
    win()
    {
        this.gameFinished = true;
        this.revealAllMines();
        this.endTimer();
    }
    lose()
    {
        this.gameFinished = true;
        this.revealAllMines();
        this.endTimer()
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
        if (x < 0 || y < 0 || x >= this.width || y >= this.height)
            return -1;
        return y * this.width + x;
    }
    fromId(id: number): [number, number]
    {
        return [id % this.width, Math.floor(id / this.width)];
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