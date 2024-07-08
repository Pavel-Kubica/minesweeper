
#include "Board.hpp"
#include <iostream>

Board::Board(size_t xSize, size_t ySize) : width(xSize), height(ySize), mines(NOT_SET), state(GameState::IN_PLAY)
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
    auto targetTile = board[pos.x][pos.y];
    if (targetTile.isRevealed())
    { // RLClick on already revealed tile should reveal all adjacent
        revealAdjacentRecursively(pos, true);
        return;
    }
    revealWithEndCheck(pos);
    if (targetTile.getContent().isZero())
    {
        revealAdjacentRecursively(pos, false);
    }
}

void Board::revealWithEndCheck(Position pos)
{
    auto targetTile = board[pos.x][pos.y];
    targetTile.reveal();
    if (targetTile.getContent().isMine())
    {
        state = GameState::LOST;
        revealAllMines();
        return;
    }
    revealedSafeTiles++;
    if (revealedSafeTiles >= (width * height - mines))
    {
        state = GameState::WON;
        revealAllMines();
    }
}

void Board::revealAdjacentRecursively(Position pos, bool force)
{
    revealWithEndCheck(pos);
    if (force || board[pos.x][pos.y].getContent().isZero())
    {
        auto allAdjacent = pos.getAllAdjacent();
        for (auto& adjPos: allAdjacent)
        {
            if (!isOutOfBounds(adjPos) && !board[adjPos.x][adjPos.y].isRevealed())
                revealAdjacentRecursively(adjPos, false);
        }
    }
}

GameState Board::getState() const
{
    return state;
}

void Board::calculateAllNumbers()
{

}

void Board::revealAllMines()
{
    for (auto& vec : board)
    {
        for (auto& tile : vec)
        {
            if (tile.getContent().isMine())
                tile.reveal();
        }
    }
}

bool Board::isOutOfBounds(Position pos) const
{
    return pos.x < width && pos.y < height;
}
