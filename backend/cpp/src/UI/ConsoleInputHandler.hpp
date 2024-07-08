
#pragma once
#include "InputHandler.hpp"

class ConsoleInputHandler : public InputHandler
{
public:
    std::tuple<size_t, size_t, size_t, bool> getGameParameters() override;
    Position getMove() override;
    bool endCurrentGame() override;
    bool quitGame() override;
};
