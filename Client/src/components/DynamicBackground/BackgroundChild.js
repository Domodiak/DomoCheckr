import styles from './DynamicBackground.module.scss'
import { useState, useEffect, useRef } from 'react'

function generateRandomColor(hueRange) {
    var hue = Math.floor(Math.random() * (hueRange[1] - hueRange[0]) + hueRange[0])
    var saturation = 50
    var value = 5
    return "radial-gradient(circle, hsl(" + hue + ", " + saturation + "%, " + value + "%) 0%, transparent 70%)"
}

function generateRandomPosition() {
    var x = Math.random() * 100 - 40
    var y = Math.random() * 100 - 40
    return {x: x, y: y}
}

function posObjToString(x, y) {
    return x + "vw, " + y + "vh"
}

export function BackgroundChild({ hueRange }) {
    const childRef = useRef(null)
    const [ color, setColor ] = useState(generateRandomColor(hueRange))
    const [ lastPos, setLastPos ] = useState(generateRandomPosition())
    const [ currentAnimation, setCurrentAnimation ] = useState(null)
    
    useEffect(() => {
        let animation;
        let newPos = generateRandomPosition();
        const applyAnimation = () => {
            const animationProps = [
                { transform: 'translate(' + posObjToString(lastPos.x, lastPos.y) + ')' },
                { transform: 'translate(' + posObjToString(newPos.x, newPos.y) + ')' }
            ]
            
            animation = childRef.current.animate(animationProps, {
                duration: 4000, //i tried adding in move speed but it just didnt work well for some reason
                fill: 'forwards',
            })
            setCurrentAnimation(animation)
            animation.onfinish = () => {
                setCurrentAnimation(null)
                setLastPos(newPos)
                newPos = generateRandomPosition()
            }
        }

        if (currentAnimation === null) {
            applyAnimation()
        }

        return () => {
            if (currentAnimation !== null) {
                currentAnimation.cancel()
            }
        }

    }, [currentAnimation, lastPos])

    return (
        <div ref={childRef} style={{backgroundImage: color}} className={styles.backgroundChild} />
    )
}
