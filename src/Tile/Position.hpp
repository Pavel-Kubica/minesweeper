
#pragma once

#include <vector>

struct Position
{
    int x;
    int y;
    std::vector<Position> getAllAdjacent();
};