
const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 16;
const DEFAULT_MINES = 99

let data = [];
let firstMove = true;
let mines = undefined;
let width = undefined;
let height = undefined;
function startGame()
{
    width = document.getElementById("widthInput").value;
    if (width == 0)
        width = DEFAULT_WIDTH;
    height = document.getElementById("heightInput").value;
    if (height == 0)
        height = DEFAULT_HEIGHT;
    mines = document.getElementById("mineInput").value;
    if (mines == 0)
        mines = DEFAULT_MINES;
    generateEmptyBoard(width, height);
}
function generateEmptyBoard(width, height)
{
    let gameDiv = document.createElement("div");
    gameDiv.style.width = width * 32 + "px";
    gameDiv.style.height = height * 32 + "px";
    gameDiv.id = "game";
    for (let i = 0; i < width; i++)
    {
        for (let j = 0; j < height; j++)
        {
            let square = document.createElement("div");
            square.classList.add("tile", "blank");
            let id = j + "_" + i;
            data[id] = 0;
            square.id = id;
            square.addEventListener("click", (ev) => { revealTile(square); })
            gameDiv.appendChild(square);
        }
    }
    document.getElementById("game-window").appendChild(gameDiv);
}

/**
 * @param {HTMLDivElement} tile
 */
function revealTile(tile)
{
    if (firstMove)
    {
        placeMines(tile);
        firstMove = false;
    }
    let tileValue = data[tile.id];
    // TODO
}

function validPosition(posStr)
{
    return posStr in data;
}

/**
 * Places all mines, ign
 * @param {HTMLDivElement} firstTile
 */
function placeMines(firstTile)
{
    let surrounding = getSurroundingTiles(firstTile);
}

function getSurroundingTiles(tile)
{
    let x = +tile.id.split('_')[0];
    let y = +tile.id.split('_')[1];
    return [
             x-1 + "_" + y-1,
             x + "_" + y-1,
             x+1 + "_" + y-1,
             x-1 + "_" + y,
             x+1 + "_" + y,
             x-1 + "_" + y+1,
             x + "_" + y+1,
             x+1 + "_" + y+1
           ].filter(validPosition);
}