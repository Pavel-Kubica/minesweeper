
#pragma once
#include "Board.hpp"

class Game
{
public:
    // On hard mode, mines are placed immediately upon starting.
    // On easy mode, there is a guarantee that the first revealed tile will be a 0
    Game(Board board, bool hardMode, size_t mines);
    void play();

private:
    // returns the position of the player's next desired move
    Position getMove();
    Board board;
};