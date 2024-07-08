
#pragma once
#include "InputHandler.hpp"
#include "Move.hpp"

// This input method is only for debugging and potentially internal communication, not meant for public use
class ConsoleInputHandler : public InputHandler
{
public:
    std::tuple<size_t, size_t, size_t, bool> getNewGameParameters() override;
    Move getMove() override;
    bool endCurrentGame() override;
    bool quitGame() override;
};
