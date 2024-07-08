
#include "ConsoleInputHandler.hpp"
#include <iostream>

std::tuple<size_t, size_t, size_t, bool> ConsoleInputHandler::getGameParameters()
{
    size_t x, y, mines;
    bool hardMode;
    std::cout << "x, y, mines, hardMode" << std::endl;
    std::cin >> x >> y >> mines >> hardMode;
    return {x, y, mines, hardMode};
}

Position ConsoleInputHandler::getMove()
{
    std::cout << "Move:" << std::endl;
    int x, y;
    std::cin >> x >> y;
    return {x,y};
}

bool ConsoleInputHandler::endCurrentGame()
{
    return false;
}

bool ConsoleInputHandler::quitGame()
{
    return false;
}
