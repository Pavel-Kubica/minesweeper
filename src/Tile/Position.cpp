
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
