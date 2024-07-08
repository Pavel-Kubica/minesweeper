
#include "Board.hpp"
#include <iostream>

Board::Board(size_t xSize, size_t ySize)
{
    board.resize(xSize);
    for (auto& vec : board)
    {
        vec.resize(ySize);
    }

}

void Board::placeMines(size_t count)
{

}

UITile& Board::operator[](Position pos)
{
    return board[pos.x][pos.y];
}

const UITile& Board::operator[](Position pos) const
{
    return board[pos.x][pos.y];
}

void Board::reveal(Position pos)
{

}

void Board::revealAdjacent(Position pos)
{

}

GameState Board::getState() const
{
    return GameState::WON;
}

void Board::calculateAllNumbers()
{

}

bool Board::isOutOfBounds(Position pos)
{
    return false;
}
