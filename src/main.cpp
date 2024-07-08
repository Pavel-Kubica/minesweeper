

#include <cstdlib>
#include "Game/Board.hpp"
#include "Game/Game.hpp"

int main(int argc, char** argv)
{
    if (argc < 3) return 1;
    int x = atoi(argv[1]);
    int y = atoi (argv[2]);
    if (x < 1 || y < 1)
        return 2;
    Board board{static_cast<size_t>(x), static_cast<size_t>(y)};
    Game game(board);
    game.play();

    return 0;
}