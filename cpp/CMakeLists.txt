cmake_minimum_required(VERSION 3.28)
project(minesweeper)

set(CMAKE_CXX_STANDARD 20)
file(GLOB_RECURSE SOURCE
        src/Game/*
        src/Tile/*
        src/UI/*
)

include_directories(src)
include_directories(src/Tile)
include_directories(src/Game)
include_directories(src/UI)
include_directories(src/Enums)

add_executable(minesweeper ${SOURCE} src/main.cpp)
add_executable(run_tests ${SOURCE} tests/all_tests.cpp)
add_test(NAME all_tests
         COMMAND run_tests)
