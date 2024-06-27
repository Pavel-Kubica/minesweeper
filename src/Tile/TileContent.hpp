
#pragma once
#include <iostream>

class TileContent
{
public:
    static constexpr int MINE = -1;

    TileContent(int number);
    bool isMine() const;
    bool isZero() const;

    void print(std::ostream& os) const;

private:
    int number;
};