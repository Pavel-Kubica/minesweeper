
#include "Board.hpp"
#include <iostream>
#include <cstdlib>

Board::Board(size_t xSize, size_t ySize) : width(xSize), height(ySize), mines(NOT_SET), state(GameState::IN_PLAY), revealedSafeTiles(0)
{
    board.resize(xSize);
    for (auto& vec : board)
    {
        vec.resize(ySize);
    }

}

void Board::placeMines(size_t count)
{
    if (count >= (width * height - 10)) // Must leave space for easy mode initial reveal
        throw std::invalid_argument("Cannot place this many mines");
    mines = count;
    for (int i = 0; i < mines; ++i)
    {
        int x = rand() % width;
        int y = rand() % height;
        if (board[x][y].isMine() || board[x][y].isRevealed()) // Have to random another position
            i--;
        else
            board[x][y] = UITile(TileContent(TileContent::MINE));
    }
    calculateAllNumbers();
}

void Board::calculateAllNumbers()
{
    for (int x = 0; x < width; ++x)
    {
        for (int y = 0; y < height; ++y)
        {
            if (board[x][y].isMine())
                continue;
            auto adj = Position{x,y}.getAllAdjacent();
            int mineCtr = 0;
            for (auto& pos : adj)
            {
                if (!isOutOfBounds(pos) && board[pos.x][pos.y].isMine())
                    mineCtr++;
            }
            board[x][y].setNumber(mineCtr);
        }
    }
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
    auto& targetTile = board[pos.x][pos.y];
    if (targetTile.isRevealed())
    { // RLClick on already revealed tile should reveal all adjacent
        int flagCounter = 0;
        auto adjPositions = pos.getAllAdjacent();
        for (auto& adjPos : adjPositions)
        {
            if (isOutOfBounds(adjPos))
                continue;
            auto& adjTile = board[adjPos.x][adjPos.y];
            if (adjTile.isRevealed() && adjTile.isFlagged())
                flagCounter++;
        }

        if (flagCounter == targetTile.getNumber())
        {
            revealAdjacentRecursively(pos, true);
        }
        return;
    }
    plainRevealWithEndCheck(pos);
    if (targetTile.isZero())
    {
        revealAdjacentRecursively(pos, false);
    }
}

void Board::plainRevealWithEndCheck(Position pos)
{
    if (isOutOfBounds(pos))
        return;
    auto& targetTile = board[pos.x][pos.y];
    if (targetTile.isRevealed())
        return;

    targetTile.reveal();
    revealedSafeTiles++;
    if (targetTile.isMine())
    {
        state = GameState::LOST;
        revealAllMines();
        return;
    }
    if (revealedSafeTiles >= (width * height - mines))
    {
        state = GameState::WON;
        revealAllMines();
    }
}

void Board::revealAdjacentRecursively(Position pos, bool force)
{
    plainRevealWithEndCheck(pos);
    if (force || board[pos.x][pos.y].isZero())
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

void Board::revealAllMines()
{
    for (auto& vec : board)
    {
        for (auto& tile : vec)
        {
            if (tile.isMine())
                tile.reveal();
        }
    }
}

bool Board::isOutOfBounds(Position pos) const
{
    return pos.x >= width || pos.x < 0 ||
           pos.y >= height || pos.y < 0;
}

const std::vector<std::vector<UITile>>& Board::getData() const
{
    return board;
}
