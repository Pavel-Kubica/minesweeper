
const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 16;
const DEFAULT_MINES = 99
function startGame()
{
    let width = document.getElementById("widthInput").value;
    if (width === undefined)
        width = DEFAULT_WIDTH;
    let height = document.getElementById("heightInput").value;
    if (height === undefined)
        height = DEFAULT_HEIGHT;
    let mines = document.getElementById("mineInput").value;
    if (mines === undefined)
        mines = DEFAULT_MINES;

    // document.getElementById("game-window").innerText = "W: " + width + "H: " + height + "M: " + mines;
}
