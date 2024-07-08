
#pragma once
#include "OutputHandler.hpp"

class ConsoleOutputHandler : public OutputHandler
{
public:

    void displayBoard(const Board& board) override;

    void win() override;

    void lose() override;
};
