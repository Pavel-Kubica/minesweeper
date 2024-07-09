
const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 16;
const DEFAULT_MINES = 99
function startGame()
{
    let width = document.getElementById("widthInput").value;
    if (width == 0)
        width = DEFAULT_WIDTH;
    let height = document.getElementById("heightInput").value;
    if (height == 0)
        height = DEFAULT_HEIGHT;
    let mines = document.getElementById("mineInput").value;
    if (mines == 0)
        mines = DEFAULT_MINES;
    generateEmptyBoard(width, height);

}

function generateEmptyBoard(width, height)
{
    let gameDiv = document.createElement("div");
    gameDiv.id = "game";
    for (let i = 0; i < width; i++)
    {
        for (let j = 0; j < height; j++)
        {
            let square = document.createElement("div");
            square.classList.add("tile", "blank");
            square.id = j + "_" + i;
            gameDiv.appendChild(square);
        }
    }
    document.getElementById("game-window").appendChild(gameDiv);
}
