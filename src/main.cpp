

#include <cstdlib>
#include "Game/Board.hpp"
#include "Game/Game.hpp"

int main(int argc, char** argv)
{
    // TODO proper input sanitation
    if (argc < 4) return 1;
    int x = atoi(argv[1]);
    int y = atoi(argv[2]);
    int mines = atoi(argv[3]);
    if (x < 1 || y < 1 || mines > x * y)
        return 2;
    Board board{static_cast<size_t>(x), static_cast<size_t>(y)};
    Game game(board, true, mines);
    game.play();

    return 0;
}