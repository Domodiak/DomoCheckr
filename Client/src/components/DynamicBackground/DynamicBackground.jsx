import { useState } from 'react';
import styles from './DynamicBackground.module.scss'
import { BackgroundChild } from './BackgroundChild.jsx';

const HUE_RANGES = [
    [0, 60],
    [80, 200],
    [220, 320],
]

function useDynamicBackground(count) {
    var hueRange = HUE_RANGES[Math.round(Math.random() * (HUE_RANGES.length - 1))]

    const [children, setChildren] = useState(Array.from({ length: count }, (_, i) => (
        <BackgroundChild key={i} hueRange={hueRange} />
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