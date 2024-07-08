
#include <cstdlib>
#include "Game/Game.hpp"
#include "UI/IOManager.hpp"

int main()
{
    srand(12345);
    IOManager IOM;
    while (!IOM.getInputHandler()->quitGame())
    {
        auto [x, y, mines, hardMode] = IOM.getInputHandler()->getNewGameParameters();
        Board board{x, y};
        Game game(board, hardMode, mines, IOM);
        game.play();
    }

    return 0;
}