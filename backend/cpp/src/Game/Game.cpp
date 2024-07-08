
#include "Game.hpp"

Game::Game(Board board, bool hardMode, size_t mines, IOManager& IOM) : hardMode(hardMode), board(std::move(board)), inputHandler(IOM.getInputHandler()), outputHandler(IOM.getOutputHandler())
{
    if (hardMode)
    {
        board.placeMines(mines);
    }
}

void Game::play()
{
    if (!hardMode)
    {
        // TODO
    }
    while (board.getState() == GameState::IN_PLAY && !inputHandler->endCurrentGame() && !inputHandler->quitGame()) // main loop
    {
        Position nextMove = inputHandler->getMove();
        board.reveal(nextMove);
        outputHandler->displayBoard(board);
    }
}

