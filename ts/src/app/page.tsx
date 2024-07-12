'use client';

import Image from "next/image";
import styles from "./page.module.css";
import {GenerateEmptyBoard} from "@/app/components";

export default function Home() {
  return (
    <main className={styles.main}>
        <div className="game-window" onContextMenu={(e)=> e.preventDefault()} onDragStart={(e)=>e.preventDefault()}>
        <GenerateEmptyBoard width={30} height={16} />
        </div>
    </main>
  );
}
