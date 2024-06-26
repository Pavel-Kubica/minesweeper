
#pragma once
#include "Board.hpp"

class Game
{
public:
    Game(Board board);
    void play();

private:
    void getMove();
    void executeMove();
    Board board;
    bool gameEnded;
};