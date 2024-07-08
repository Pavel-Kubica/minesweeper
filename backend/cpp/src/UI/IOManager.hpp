
#pragma once
#include "InputHandler.hpp"
#include "OutputHandler.hpp"

class IOManager
{
public:
    IOManager();
    InputHandler* getInputHandler();
    OutputHandler* getOutputHandler();
private:
    std::unique_ptr<InputHandler> inputHandler;
    std::unique_ptr<OutputHandler> outputHandler;
};
