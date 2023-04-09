import styles from './Form.module.scss'

export function TextField(props) {
    var type = props.type || 'text'
    var onChange = props.onChange
    var onHover = props.onHover
    var placeholder = props.placeholder || "Input"
    var fullWidth = props.fullWidth
    var index = props.index
    var required = props.required

    return(
        <div className={styles.formControl}>
            <input index={index} style={{width: (fullWidth ? '100%' : 'auto')}} className={styles.formInput} type={type} onMouseOver={onHover} onInput={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}></input>
        </div>
    )
}