
#pragma once
#include "Board.hpp"
#include "IOManager.hpp"

class Game
{
public:
    // On hard mode, mines are placed immediately upon starting.
    // On easy mode, there is a guarantee that the first revealed tile will be a 0
    Game(Board board, bool hardMode, size_t mines, IOManager& IOM);
    void play();

private:
    bool hardMode;
    Board board;
    InputHandler* inputHandler;
    OutputHandler* outputHandler;
};