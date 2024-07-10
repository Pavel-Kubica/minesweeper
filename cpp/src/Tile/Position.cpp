
#include "Position.hpp"

std::vector<Position> Position::getAllAdjacent() {
    return
    {
        {x - 1, y - 1},
        {x, y - 1},
        {x + 1, y - 1},
        {x - 1, y},
        {x + 1, y},
        {x - 1, y + 1},
        {x, y + 1},
        {x + 1, y + 1}
    };
}

std::string Position::toString() const
{
    return "{" + std::to_string(x) + ", " + std::to_string(y) + "}";
}

bool Position::operator==(const Position& rhs) const
{
    return x == rhs.x && y == rhs.y;
}
bool Position::operator!=(const Position& rhs) const
{
    return !(*this == rhs);
}
