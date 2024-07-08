
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

TileContent UITile::getContent() const
{
    return content;
}

void UITile::reveal()
{
    if (content.isMine())
        state = TileState::MINE;
    else
        state = TileState::NUMBER;
}
