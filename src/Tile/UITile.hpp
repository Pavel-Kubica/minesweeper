
#pragma once
#include "TileContent.hpp"
#include "Enums/TileState.hpp"

class UITile
{
public:
    explicit UITile(TileContent content);
    UITile(TileContent content, TileState state);
    bool isRevealed() const;
    TileContent getContent() const;

    void reveal();
    void print(std::ostream& os) const;

private:
    TileState state;
    TileContent content;
};
