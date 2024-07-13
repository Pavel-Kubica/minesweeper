import styles from "./page.module.css";
import {GameWindow} from "@/app/components";

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
