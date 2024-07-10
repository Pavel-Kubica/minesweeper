
#pragma once

#include <vector>
#include <string>

struct Position
{
    int x;
    int y;
    std::vector<Position> getAllAdjacent();

    std::string toString() const;
    bool operator==(const Position& rhs) const;
    bool operator!=(const Position& rhs) const;
};