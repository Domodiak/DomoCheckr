import { Task } from "./Task.jsx"
import styles from './Tasks.module.scss'

export function MapTasks({ tasks }) {
    tasks = [...tasks].reverse()

    return (
        <div className={styles.tasks}>
            {
                tasks.map((task, index) => {
                    return <Task key={index} title={task.title} description={task.description} />
                })
            }
        </div>
    )
}