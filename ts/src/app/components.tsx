'use client';

import styles from "@/app/page.module.css";
import {useState} from "react";

export function TileCmpnt({tileId, clickCallback})
{
    console.log("tile being created");
    const [className, setClassName] = useState(styles.blank)
    return <div key={tileId}
                id={tileId}
                className={className}
                onMouseUp={clickCallback(setClassName)}
            >
    </div>
}

export function BoardCmpnt({children})
{
    return (
        <div id="game"
             className={styles.game}
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
        >
            {children}
        </div>
    )
}