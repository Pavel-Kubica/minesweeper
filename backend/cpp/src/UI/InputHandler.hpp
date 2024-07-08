
#pragma once
#include <utility>
#include "Move.hpp"

class InputHandler
{
public:
    virtual ~InputHandler() = default;

    virtual std::tuple<size_t, size_t, size_t, bool> getGameParameters() = 0;
    virtual Move getMove() = 0;
    virtual bool endCurrentGame() = 0;
    virtual bool quitGame() = 0;
};
