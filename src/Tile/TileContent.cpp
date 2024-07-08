
#include "TileContent.hpp"

TileContent::TileContent(int number) : number(number)
{}

bool TileContent::isMine() const
{
    return number == MINE;
}

bool TileContent::isZero() const
{
    return number == 0;
}

void TileContent::print(std::ostream &os) const
{
    // TODO printing

}
