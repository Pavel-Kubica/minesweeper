
#pragma once
#include <iostream>

class TileContent
{
public:
    static constexpr int MINE = -1;

    explicit TileContent(int number);
    [[nodiscard]] bool isMine() const;
    [[nodiscard]] bool isZero() const;
    [[nodiscard]] int getNumber() const;

private:
    int number;
};