import styles from './Form.module.scss'

export function Form(props) {
    var onSubmit = props.onSubmit
    var Validate = props.Validate

    return (
        <form onSubmit={onSubmit} noValidate={!Validate} className={styles.form}>
            {props.children}     
        </form>
    )
}