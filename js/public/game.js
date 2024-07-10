
const DEFAULT_WIDTH = 9;
const DEFAULT_HEIGHT = 9;
const DEFAULT_MINES = 10;
const MINE = -1;

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
    data = [];
    generateEmptyBoard(width, height);
}
function generateEmptyBoard(width, height)
{
    let gameDiv = document.createElement("div");
    gameDiv.style.width = width * 32 + "px";
    gameDiv.style.height = height * 32 + "px";
    gameDiv.id = "game";
    for (let i = 0; i < height; i++)
    {
        for (let j = 0; j < width; j++)
        {
            let square = document.createElement("div");
            square.classList.add("tile", "blank");
            let idString = toIdString(i, j);
            data[idString] = 0;
            square.id = idString;
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

}

function toIdString(x, y)
{
    return x + "_" + y;
}

function fromIdString(id)
{
    return [+id.split('_')[0],+id.split('_')[1]];
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
    let protectedTiles = getSurroundingValidTiles(firstTile.id);
    protectedTiles.push(firstTile.id);
    for (let i = 0; i < mines; i++)
    {
        let x = Math.floor(Math.random() * height);
        let y = Math.floor(Math.random() * width);
        let xyStr = toIdString(x, y);
        if (protectedTiles.includes(xyStr) || data[xyStr] === MINE) // tile is protected or already mined
        {
            i--;
            continue;
        }
        data[xyStr] = MINE;
    }
    calculateAllNumbers();
}

function calculateAllNumbers()
{
    for (let i = 0; i < height; i++)
    {
        for (let j = 0; j < width; j++)
        {
            let idStr = toIdString(i, j);
            if (data[idStr] !== MINE)
            {
                data[idStr] = getSurroundingValidTiles(idStr).reduce(
                    (acc, tileId) => acc + (data[tileId] === MINE),
                    0);
            }
        }
    }
}

/**
 *
 * @param {string} tileId
 * @returns {string[]}
 */
function getSurroundingValidTiles(tileId)
{
    let [x, y] = fromIdString(tileId);
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