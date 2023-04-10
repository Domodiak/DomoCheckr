import styles from './Form.module.scss'

export function FormSubmit(props) {
    var text = props.content
    var onHover = props.onHover
    var index = props.index
    return (
        <div className={styles.formControl}>
            <div className={styles.formSubmitContainer}>
                <input index={index} type="submit" onMouseOver={onHover} className={styles.formSubmit} value={text}></input>
            </div>
        </div>
    )
}