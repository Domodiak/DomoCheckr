import styles from './Form.module.scss'

export function FormSubmit({ variant, content, onHover, index }) {
    var colorVariant = variant ? "formSubmitVariant" + variant : undefined
    return (
        <div className={styles.formControl}>
            <div className={styles.formSubmitContainer}>
                <input index={index} type="submit" onMouseOver={onHover} className={styles.formSubmit + (styles[colorVariant] ? " " + styles[colorVariant] : "")} value={content}></input>
            </div>
        </div>
    )
}