
#include "TileContent.hpp"

TileContent::TileContent(int number) : number(number)
{
    if (number < MINE || number > 8)
        throw std::invalid_argument("Invalid tile number!");
}

bool TileContent::isMine() const
{
    return number == MINE;
}

bool TileContent::isZero() const
{
    return number == 0;
}

int TileContent::getNumber() const
{
    return number;
}

void TileContent::setNumber(int num)
{
    number = num;
}

bool TileContent::operator==(const TileContent& rhs) const
{
    return number == rhs.number;
}

bool TileContent::operator!=(const TileContent& rhs) const
{
    return !(*this == rhs);
}

