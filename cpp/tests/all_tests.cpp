#define CATCH_CONFIG_MAIN
#include "catch2/catch.hpp"
#include "../src/Game/Board.hpp"

TEST_CASE("Board edge cases")
{
    REQUIRE_THROWS(Board{0, 0});
    REQUIRE_THROWS(Board{123456, 123456});
    Board board{30, 30};
    REQUIRE_THROWS(board.revealAdjacentRecursively({-1, 0}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({31, 0}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({2, 30}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({30, 30}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({30, -1}));
}

TEST_CASE("Board functionality")
{
    size_t width = 15, height = 15;
    std::vector<std::vector<UITile>> testBoard;
    testBoard.resize(15);
    for (auto& vec : testBoard)
    {
        vec.resize(15);
    }
    Board board{testBoard};
    board.at({5,5}).setNumber(TileContent::MINE);
    board.at({0,0}).setNumber(TileContent::MINE);
    Position surrounded{10, 10};
    auto surrounding = surrounded.getAllAdjacent();
    for (const auto& adjPos : surrounding)
    {
        board.at(adjPos).setNumber(TileContent::MINE);
    }
    board.calculateAllNumbers();
    REQUIRE(board.at({0,0}).isMine());
    REQUIRE(board.at({5,5}).isMine());
    REQUIRE(board.at({0,1}).getNumber() == 1);
    REQUIRE(board.at({1,1}).getNumber() == 1);
    REQUIRE(board.at({1,0}).getNumber() == 1);
    REQUIRE_NOTHROW(board.at({0,0}));
    REQUIRE(board.at(surrounded).getNumber() == 8);
    Board parallel = board;
    board.reveal({3,3});
    parallel.revealAdjacentRecursively({3,3});
    REQUIRE(board.getData() == parallel.getData());
    for (int i = 0; i < width; ++i)
    {
        for (int j = 0; j < height; ++j)
        {
            if (Position{i, j} != surrounded)
            {
                REQUIRE((board.at({i,j}).isMine() || board.at({i, j}).isRevealed()));
            }
        }
    }
    REQUIRE(board.getState() == GameState::IN_PLAY);
}