'use client';

import styles from "./page.module.css";
import {BoardCmpnt, GameWindow, TileCmpnt} from "@/app/components";
import {Board} from "@/app/board";

// todo load these from input
const WIDTH = 9;
const HEIGHT = 9;

export default function Home()
{
    return (
        <main className={styles.main}>
            <GameWindow width={WIDTH} height={HEIGHT}>
            </GameWindow>
        </main>
    );
}
