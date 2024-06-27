
#pragma once

#include "Tile.hpp"
#include "Position.hpp"
#include "Enums/GameState.hpp"
#include <vector>

class Board
{
public:
    Board(size_t xSize, size_t ySize);
    void placeMines(size_t count);

    Tile& operator[](Position pos);
    const Tile& operator[](Position pos) const;

    void reveal(Position pos);
    void revealAdjacent(Position pos);

    GameState getState() const;

    void print();
    void printDefeatBoard();
    void printVictoryBoard();
private:
    size_t width;
    size_t height;
    size_t mines;
    GameState state;
    std::vector<std::vector<Tile>> board;

    void calculateAllNumbers();
    bool isOutOfBounds(Position pos);
};