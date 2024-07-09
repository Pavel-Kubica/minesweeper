cmake_minimum_required(VERSION 3.28)
project(minesweeper)

set(CMAKE_CXX_STANDARD 20)
file(GLOB_RECURSE SOURCE
        src/*
)

include_directories(src)
include_directories(src/Tile)
include_directories(src/Game)
include_directories(src/UI)
include_directories(src/Enums)

add_executable(minesweeper ${SOURCE})
