
#pragma once
#include "InputHandler.hpp"
#include "Move.hpp"

class ConsoleInputHandler : public InputHandler
{
public:
    std::tuple<size_t, size_t, size_t, bool> getGameParameters() override;
    Move getMove() override;
    bool endCurrentGame() override;
    bool quitGame() override;
};
