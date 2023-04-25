import React, { useEffect, useRef, useState } from "react";
import styles from './Dropdown.module.scss'

export function DropdownMenu({ options, select, dropdownClass, closeOnChoose, closeOnFocusLost, visible, setVisible }) {
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRef = useRef()

    function handleOptionSelect(e) {
        setSelectedOption(e.target.getAttribute('dropdownkey'));
        select(e.target.getAttribute('dropdownkey'));
        if(closeOnChoose) {
            setVisible(false)
        }
    }

    useEffect(() => {
        function handleClick(e) {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target) && closeOnFocusLost) {
                setVisible(false)
            }
        }

        document.addEventListener('mouseup', handleClick)

        return () => {
            document.removeEventListener('mouseup', handleClick)
        }
    }, [ closeOnFocusLost, setVisible ])

    return (
        visible ?
        <div ref={dropdownRef} className={dropdownClass + " " + styles.dropdown}>
            {options.map((option, i) => {
                return <div dropdownkey={option.value} key={i} onClick={handleOptionSelect} className={styles.option}>
                    {option.label}
                </div>
            })}
        </div> : ''
    );
}

export default DropdownMenu;