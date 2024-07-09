
#pragma once

#include <vector>
#include <string>

struct Position
{
    int x;
    int y;
    std::string toString() const;
    std::vector<Position> getAllAdjacent();
};