import styles from './DynamicBackground.module.scss'
import { useState, useEffect, useRef } from 'react'

function generateRandomColor() {
    var hue = Math.floor(Math.random() * 70 + 220)
    var saturation = 100
    var value = 7
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

// function distance(A, B) {
//     return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
// }

export function BackgroundChild() {
    const childRef = useRef(null)
    const [ color, setColor ] = useState(generateRandomColor())
    const [ lastPos, setLastPos ] = useState(generateRandomPosition())
    const [ currentAnimation, setCurrentAnimation ] = useState(null)
    
    useEffect(() => {
        let animation;
        let newPos = generateRandomPosition();
        const applyAnimation = () => {
            //var dist = distance(lastPos, newPos)
            //var speed = 50
            
            const animationProps = [
                { transform: 'translate(' + posObjToString(lastPos.x, lastPos.y) + ')' },
                { transform: 'translate(' + posObjToString(newPos.x, newPos.y) + ')' }
            ]
            
            animation = childRef.current.animate(animationProps, {
                duration: 4000,
                fill: 'forwards',
                easing: 'linear'
            })
            console.log(currentAnimation)
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
