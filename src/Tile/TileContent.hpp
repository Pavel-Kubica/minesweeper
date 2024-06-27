
#pragma once
#include <iostream>

class TileContent
{
public:
    TileContent(int number);
    bool isMine() const;
    bool isZero() const;

    void print(std::ostream& os) const;
private:
    int number;
};