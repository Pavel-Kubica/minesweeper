
#pragma once
#include "TileContent.hpp"
#include "Enums/TileState.hpp"

class UITile
{
public:
    explicit UITile(TileContent content);
    UITile(TileContent content, TileState state);
    void reveal();
    TileContent getContent() const;
    bool isRevealed() const;
    void print(std::ostream& os) const;

private:
    TileState state;
    TileContent content;
};
