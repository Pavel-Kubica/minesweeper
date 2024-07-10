
#pragma once
#include <iostream>

class TileContent
{
public:
    static constexpr int MINE = -1;

    TileContent(int number);
    [[nodiscard]] bool isMine() const;
    [[nodiscard]] bool isZero() const;
    [[nodiscard]] int getNumber() const;
    void setNumber(int num);

    bool operator==(const TileContent& rhs) const;
    bool operator!=(const TileContent& rhs) const;
private:
    int number;
};