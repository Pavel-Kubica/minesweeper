import Image from "next/image";
import styles from "./page.module.css";
import {GenerateEmptyBoard} from "@/app/tile-generation";

export default function Home() {
  return (
    <main className={styles.main}>
        <div className="game-window">
        <GenerateEmptyBoard width={30} height={16} />
        </div>
    </main>
  );
}
