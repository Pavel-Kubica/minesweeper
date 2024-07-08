
#include "UITile.hpp"

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

void UITile::print(std::ostream &os) const
{
    // TODO printing
    switch (state)
    {
        case TileState::EMPTY:

            break;
        case TileState::FLAG:

            break;
        case TileState::MINE:

            break;
        case TileState::NUMBER:

            break;
        default:
            throw std::runtime_error("unreachable branch");
    }
}