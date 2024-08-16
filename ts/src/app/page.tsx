import styles from "./page.module.css";
import {App} from "@/app/components";

export default function Home()
{
    return (
        <main className={styles.main}>
            <App/>
        </main>
    );
}
