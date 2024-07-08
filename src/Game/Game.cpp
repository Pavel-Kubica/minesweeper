

#include "Game.hpp"

Game::Game(Board board, bool hardMode, size_t mines) : board(std::move(board))
{
    if (hardMode)
    {
        board.placeMines(mines);
    }
    // TODO easy mode
}

void Game::play()
{
    while (board.getState() == GameState::IN_PLAY) // main loop
    {
        Position nextMove = getMove();
        board.reveal(nextMove);

    }
}

Position Game::getMove()
{

}


