
#pragma once
#include "Game/Board.hpp"

class OutputHandler
{
public:
    virtual ~OutputHandler() = default;

    static std::unique_ptr<OutputHandler> getOutputHandler();
    virtual void displayBoard(const Board& board) = 0;
protected:

};