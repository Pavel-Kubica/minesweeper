#define CATCH_CONFIG_MAIN
#include "catch2/catch.hpp"
#include "../src/Game/Board.hpp"

TEST_CASE("Board edge cases") {
    REQUIRE_THROWS(Board{0, 0});
    REQUIRE_THROWS(Board{123456, 123456});
    Board board{30, 30};
    REQUIRE_THROWS(board.revealAdjacentRecursively({-1, 0}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({31, 0}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({2, 30}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({30, 30}));
    REQUIRE_THROWS(board.revealAdjacentRecursively({30, -1}));
}