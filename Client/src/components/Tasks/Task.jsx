import { useState } from 'react'
import DropdownMenu from '../Dropdown/Dropdown.jsx'
import styles from './Tasks.module.scss'

export function Task({ title, description }) {
    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)

    return(
        <div className={styles.task}>
            <div className={styles.taskContent}>
                <div className={styles.taskTitle}>{title}</div>
                <div className={styles.taskDescription}>{description}</div>
            </div>
            
            <span className={styles.taskIcon + " material-symbols-outlined"} onClick={() => {setIsDropdownVisible(true)}}>more_vert</span>
            <DropdownMenu options={[{ label: 'Edit', value: 'edit'}, { label: 'Delete', value: 'delete' }, { label: 'Third option', value: 'a' }]} select={(option) => {console.log(option)}} dropdownClass={styles.taskDropdown} closeOnChoose closeOnFocusLost visible={isDropdownVisible} setVisible={setIsDropdownVisible} />
        </div>
    )
}