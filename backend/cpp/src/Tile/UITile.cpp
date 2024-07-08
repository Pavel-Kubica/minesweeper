
#include "UITile.hpp"


UITile::UITile() : content(TileContent{0}), state(TileState::EMPTY)
{}

UITile::UITile(TileContent content) : content(content), state(TileState::EMPTY)
{}

UITile::UITile(TileContent content, TileState state) : content(content), state(state)
{}

bool UITile::isRevealed() const
{
    return state == TileState::MINE || state == TileState::NUMBER;
}

bool UITile::isFlagged() const
{
    return state == TileState::FLAG;
}

bool UITile::isMine() const
{
    return content.isMine();
}

bool UITile::isZero() const
{
    return content.isZero();
}

int UITile::getNumber() const
{
    return content.getNumber();
}

void UITile::setNumber(int num)
{
    content.setNumber(num);
}

void UITile::reveal()
{
    if (content.isMine())
        state = TileState::MINE;
    else
        state = TileState::NUMBER;
}
