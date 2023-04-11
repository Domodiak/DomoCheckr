import { useEffect, useState } from 'react';
import styles from './DynamicBackground.module.scss'
import { BackgroundChild } from './BackgroundChild';

function useDynamicBackground(count) {

    const [children, setChildren] = useState(Array.from({ length: count }, (_, i) => (
        <BackgroundChild key={i} />
    )))
    
    return children

}

export function DynamicBackground({ count }) {
    const backgroundChildren = useDynamicBackground(count)
    return (
        <div className={styles.background}>
            {backgroundChildren}
        </div>
    )
}