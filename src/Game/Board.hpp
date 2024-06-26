
#pragma once

#include "Tile.hpp"
#include "Position.hpp"
#include <vector>

class Board
{
public:
    Board(size_t xSize, size_t ySize);
    Tile& operator[](Position pos);
    void reveal(Position pos);
    void revealAdjacent(Position pos);

    void print();
    void printDefeatBoard();
private:
    size_t width;
    size_t height;
    std::vector<std::vector<Tile>> board;

    bool isOutOfBounds(Position pos);
};