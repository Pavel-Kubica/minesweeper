
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
            square.addEventListener("mouseup", (ev) =>
                {
                    if (ev.button === 0)
                        revealTile(square);
                    else if (ev.button === 2)
                        flagTile(square);
                })
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
    if (data[tile.id] === 0 || // revealed a zero OR
        (!revealOne(tile) && // tile was already revealed before AND
        data[tile.id] === getSurroundingValidTiles(tile.id).reduce( // number of flags around matches the value of the tile
            (acc, tileId) => acc + (document.getElementById(tileId).classList.contains("flag")),
            0)))
    {
        revealAdjacentRecursively(tile, true);
    }
}

/**
 *
 * @param {HTMLDivElement} tile
 * @param {boolean} force If force == true, we reveal adjacent even if current is not a 0 tile
 */
function revealAdjacentRecursively(tile, force = false)
{
    revealOne(tile);
    if (force || data[tile.id] === 0)
    {
        let adjacentTiles = getSurroundingValidTiles(tile.id).filter( (tileId) => document.getElementById(tileId).classList.contains("blank"))
        for (const adjacentTile of adjacentTiles) {
            revealAdjacentRecursively(document.getElementById(adjacentTile))
        }
    }
}

function revealOne(tile)
{
    let retval = tile.classList.replace("blank", "num" + data[tile.id]);
    if (data[tile.id] === MINE)
        lose();
    return retval;
}

function flagTile(tile)
{
    tile.classList.replace("blank", "flag");
}

function win()
{

}

function lose()
{
    
}

function revealAllMines()
{
    for (let i = 0; i < height; i++)
    {
        for (let j = 0; j < width; j++)
        {
            let idStr = toIdString(i, j);
            if (data[idStr] === MINE)
                document.getElementById(idStr).classList.replace("blank", "mine");
            else
                document.getElementById(idStr).classList.replace("flag", "wrongflag");
        }
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
             toIdString(x-1, y-1),
             toIdString(x, y-1),
             toIdString(x+1, y-1),
             toIdString(x-1, y),
             toIdString(x+1, y),
             toIdString(x-1, y+1),
             toIdString(x, y+1),
             toIdString(x+1, y+1)
           ].filter(validPosition);
}