//
// Created by ABCD on 29.06.2024.
//

#include "IOManager.hpp"

IOManager::IOManager()
{
    // TODO load from config which IO method we use
}

InputHandler* IOManager::getInputHandler()
{
    return inputHandler.get();
}

OutputHandler* IOManager::getOutputHandler()
{
    return outputHandler.get();
}
