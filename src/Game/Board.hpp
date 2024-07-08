
#pragma once

#include "UITile.hpp"
#include "Position.hpp"
#include "Enums/GameState.hpp"
#include <vector>

class Board
{
public:
    Board(size_t xSize, size_t ySize);
    void placeMines(size_t count);

    UITile& operator[](Position pos);
    const UITile& operator[](Position pos) const;

    void reveal(Position pos);
    void revealAdjacent(Position pos);

    GameState getState() const;

private:
    size_t width;
    size_t height;
    size_t mines;
    GameState state;
    std::vector<std::vector<UITile>> board;

    void calculateAllNumbers();
    bool isOutOfBounds(Position pos);
};