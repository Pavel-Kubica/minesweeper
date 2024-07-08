
#include "Game.hpp"

Game::Game(const Board& board, bool hardMode, size_t mines, IOManager& IOM) : hardMode(hardMode), board(board), mines(mines), inputHandler(IOM.getInputHandler()), outputHandler(IOM.getOutputHandler())
{
    if (hardMode)
    {
        this->board.placeMines(mines);
    }
}

void Game::play()
{
    if (!hardMode)
    {
        Position firstMove = inputHandler->getMove();
        board.plainRevealWithEndCheck(firstMove);
        for (auto& adjPos : firstMove.getAllAdjacent())
        {
            board.plainRevealWithEndCheck(adjPos);
        }
        board.placeMines(mines);
        for (auto& adjPos : firstMove.getAllAdjacent())
        {
            board.revealAdjacentRecursively(adjPos);
        }
        outputHandler->displayBoard(board);
    }
    while (board.getState() == GameState::IN_PLAY && !inputHandler->endCurrentGame() && !inputHandler->quitGame()) // main loop
    {
        Position nextMove = inputHandler->getMove();
        board.reveal(nextMove);
        outputHandler->displayBoard(board);
    }
    if (board.getState() == GameState::WON)
        outputHandler->win();
    else
        outputHandler->lose();
}

