import {Board} from "@/app/board";
import {BoardState} from "@/app/boardstate";

export class Game
{
    board: Board
    static secondsCounter: number = 0;
    static timer: any = undefined;
    static timerStarted: boolean = false;

    constructor(board: Board)
    {
        this.board = board;
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
                Game.endTimer();
            }
        }.bind(this);
    }

    static initializeTimer()
    {
        this.endTimer()
        Game.timerStarted = false;
        this.secondsCounter = 0;
    }
    static startTimer(setter)
    {
        setter(0);
        Game.timer = setInterval(() => setter(++Game.secondsCounter), 1000);
        Game.timerStarted = true;
    }
    static endTimer()
    {
        clearInterval(Game.timer);
        Game.timer = undefined;
    }
}