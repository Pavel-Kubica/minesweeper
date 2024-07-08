
#pragma once
#include "TileContent.hpp"
#include "Enums/TileState.hpp"
#include "Position.hpp"
#include <vector>

class UITile
{
public:
    UITile();
    explicit UITile(TileContent content);
    UITile(TileContent content, TileState state);
    [[nodiscard]] bool isRevealed() const;
    [[nodiscard]] bool isFlagged() const;
    [[nodiscard]] bool isMine() const;
    [[nodiscard]] bool isZero() const;
    [[nodiscard]] int getNumber() const;
    void setNumber(int num);

    void reveal();

private:
    TileState state;
    TileContent content;
};
