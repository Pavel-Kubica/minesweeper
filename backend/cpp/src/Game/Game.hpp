
#pragma once
#include "Board.hpp"
#include "IOManager.hpp"

class Game
{
public:
    // On hard mode, mines are placed immediately upon starting.
    // On easy mode, there is a guarantee that the first revealed tile will be a 0
    Game(const Board& board, bool hardMode, size_t mines, IOManager& IOM);
    void play();

private:
    bool hardMode;
    size_t mines;
    Board board;
    InputHandler* inputHandler;
    OutputHandler* outputHandler;
};