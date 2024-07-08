
#include "ConsoleOutputHandler.hpp"
#include <iostream>

void ConsoleOutputHandler::displayBoard(const Board& board)
{
    const auto& boardData = board.getData();
    std::cout << "  ";
    for (int i = 0; i < boardData.size(); ++i)
    {
        std::cout << " " << i << "  ";
    }
    std::cout << "\n";
    int i = 0;
    for (const auto& vec : boardData)
    {
        std::cout << i++ << " ";
        for (const auto& tile : vec)
        {
            char symbol;
            if (!tile.isRevealed())
                symbol = ' ';
            else if (tile.getContent().isMine())
                symbol = 'X';
            else
                symbol = tile.getContent().getNumber() + 48; // 48 shifts to the ascii representation of the number. Always safe because number is always 0-8
            std::cout << "[" << symbol << "] ";
        }
        std::cout << "\n";
    }
}

void ConsoleOutputHandler::win()
{
    std::cout << "WIN!" << std::endl;
}

void ConsoleOutputHandler::lose()
{
    std::cout << "LOSE!" << std::endl;
}
