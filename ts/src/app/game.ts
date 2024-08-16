import {Board} from "@/app/board";
import {Tile} from "@/app/tile";

export class Game
{
    board: Board
    secondsCounter: number;
    timer: any;

    constructor(board: Board)
    {
        this.board = board;
        this.secondsCounter = 0;
        this.timer = undefined;
    }
    handleClick(tileId)
    {
        return function(event)
        {
            if (this.board.finished())
                return;
            if (!this.board.started())
            {
                this.board.placeMines(tileId);
            }

            if (event.button === 0)
            {
                this.board.revealTile(tileId);
            }
            else if (event.button === 2)
            {
                this.board.flagTile(tileId);
            }

            if (this.board.finished())
            {
                this.endTimer();
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
}