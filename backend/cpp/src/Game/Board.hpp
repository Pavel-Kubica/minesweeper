
#pragma once

#include "UITile.hpp"
#include "Position.hpp"
#include "Enums/GameState.hpp"
#include <vector>

class Board
{
public:
    constexpr static size_t NOT_SET = -1;

    Board(size_t xSize, size_t ySize);
    void placeMines(size_t count);

    UITile& operator[](Position pos);
    const UITile& operator[](Position pos) const;

    void flag(Position pos);
    void reveal(Position pos);
    void plainRevealWithEndCheck(Position pos);
    // Force indicates that all adjacent tiles should be revealed even if the tile at pos isn't a zero
    // Any zeroes encountered also have all their adjacent revealed
    void revealAdjacentRecursively(Position pos, bool force = false);

    [[nodiscard]] GameState getState() const;
    [[nodiscard]] const std::vector<std::vector<UITile>>& getData() const;

private:
    size_t width;
    size_t height;
    size_t mines;
    GameState state;
    size_t revealedSafeTiles;
    std::vector<std::vector<UITile>> board;

    void calculateAllNumbers();
    void revealAllMines();

    [[nodiscard]] bool isOutOfBounds(Position pos) const;
};