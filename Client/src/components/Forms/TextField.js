import styles from './Form.module.scss'

export function TextField({ type, onChange, onHover, placeholder, fullWidth, index, required, name }) {
    return(
        <div className={styles.formControl}>
            <input name={name} index={index} style={{width: (fullWidth ? '100%' : 'auto')}} className={styles.formInput} type={type} onMouseOver={onHover} onInput={onChange} placeholder={placeholder} required={required}></input>
        </div>
    )
}