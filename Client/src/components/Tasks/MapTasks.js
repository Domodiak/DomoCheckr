import { Task } from "./Task"
import styles from './Tasks.module.scss'

export function MapTasks({ tasks }) {
    var tasksReversed = {}

    for(var i = tasks.length - 1; i > 0; i--) {
        tasksReversed[tasksReversed.length] = [tasks[i]]
    }

    return (
        <div className={styles.tasks}>
            {
                Object.values(tasks).map((task, index) => {
                    return <Task key={index} title={task.title} description={task.description} />
                })
            }
        </div>
    )
}