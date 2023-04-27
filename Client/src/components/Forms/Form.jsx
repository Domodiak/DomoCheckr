import styles from './Form.module.scss'

export function Form({ onSubmit, Validate, children }) {
    return (
        <form onSubmit={onSubmit} noValidate={!Validate} className={styles.form}>
            {children}     
        </form>
    )
}