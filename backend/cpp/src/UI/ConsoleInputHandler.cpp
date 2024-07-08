
#include "ConsoleInputHandler.hpp"
#include "Move.hpp"
#include <iostream>

std::tuple<size_t, size_t, size_t, bool> ConsoleInputHandler::getGameParameters()
{
    size_t x, y, mines;
    bool hardMode;
    std::cout << "x, y, mines, hardMode" << std::endl;
    std::cin >> x >> y >> mines >> hardMode;
    return {x, y, mines, hardMode};
}

Move ConsoleInputHandler::getMove()
{
    std::cout << "Move:" << std::endl;
    int x, y;
    char type;
    std::cin >> x >> y >> type;
    MoveType moveType = type == 'f' ? MoveType::FLAG : MoveType::REVEAL;
    return {{x,y},moveType};
}

bool ConsoleInputHandler::endCurrentGame()
{
    return false;
}

bool ConsoleInputHandler::quitGame()
{
    return false;
}
