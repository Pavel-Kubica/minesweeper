
#pragma once
#include "Game/Board.hpp"

class OutputHandler
{
public:
    virtual ~OutputHandler() = default;

    virtual void displayBoard(const Board& board) = 0;
    virtual void win() = 0;
    virtual void lose() = 0;
protected:

};