import styles from './Tasks.module.scss'

export function Task({ title, description }) {
    return(
        <div className={styles.task}>
            <div className={styles.taskTitle}>{title}</div>
            <div className={styles.taskDescription}>{description}</div>
        </div>
    )
}