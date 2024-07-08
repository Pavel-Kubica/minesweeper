
#pragma once
#include <utility>
#include "Position.hpp"

class InputHandler
{
public:
    virtual ~InputHandler() = default;

    virtual std::tuple<size_t, size_t, size_t, bool> getGameParameters() = 0;
    virtual Position getMove() = 0;
    virtual bool endCurrentGame() = 0;
    virtual bool quitGame() = 0;
};
