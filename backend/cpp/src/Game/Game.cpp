
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
        Move firstMove = inputHandler->getMove();
        board.plainRevealWithEndCheck(firstMove.target);
        for (auto& adjPos : firstMove.target.getAllAdjacent())
        {
            board.plainRevealWithEndCheck(adjPos);
        }
        board.placeMines(mines);
        for (auto& adjPos : firstMove.target.getAllAdjacent())
        {
            board.revealAdjacentRecursively(adjPos);
        }
        outputHandler->displayBoard(board);
    }
    while (board.getState() == GameState::IN_PLAY && !inputHandler->endCurrentGame() && !inputHandler->quitGame()) // main loop
    {
        Move nextMove = inputHandler->getMove();
        if (nextMove.type == MoveType::FLAG)
            board.flag(nextMove.target);
        else
            board.reveal(nextMove.target);
        outputHandler->displayBoard(board);
    }
    if (board.getState() == GameState::WON)
        outputHandler->win();
    else
        outputHandler->lose();
}

