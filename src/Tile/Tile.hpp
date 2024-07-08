
#pragma once

class Tile
{
public:
    static constexpr int MINE = -1;

    Tile();
    void reveal();
    bool isRevealed() const;
    bool isMine() const;
    bool isZero() const;

private:
    bool revealed;
    int number;
};