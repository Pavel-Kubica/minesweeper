
#include "IOManager.hpp"
#include "ConsoleInputHandler.hpp"
#include "ConsoleOutputHandler.hpp"

IOManager::IOManager()
{
    // TODO TEMPORARY
    inputHandler = std::make_unique<ConsoleInputHandler>();
    outputHandler = std::make_unique<ConsoleOutputHandler>();
}

InputHandler* IOManager::getInputHandler()
{
    return inputHandler.get();
}

OutputHandler* IOManager::getOutputHandler()
{
    return outputHandler.get();
}
