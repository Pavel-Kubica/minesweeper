
#include <cstdlib>
#include "Game/Game.hpp"
#include "UI/IOManager.hpp"

int main()
{
    IOManager IOM;
    while (!IOM.getInputHandler()->quitGame())
    {
        auto [x, y, mines, hardMode] = IOM.getInputHandler()->getGameParameters();
        Board board{static_cast<size_t>(x), static_cast<size_t>(y)};
        Game game(board, hardMode, mines, IOM);
        game.play();
    }

    return 0;
}