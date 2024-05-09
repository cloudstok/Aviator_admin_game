import React, { useState, useEffect } from 'react'
import '../toggleButton/toggleButton.css'
const ToggleButton = ({ defaultChecked, disabled, onChange}) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (defaultChecked) {
          
            setToggle(defaultChecked)
        }
    }, [defaultChecked])


    const triggerToggle = () => {
        if (disabled) {
            return;
        }

        setToggle(!toggle);
       
        if (typeof onChange === 'function') {
            onChange(!toggle);
        }
    }


    return (
        <>
            <div className="para-two">
                <div
                    className={`checkbox ${toggle === false && "checkbox--off"}`}
                    onClick={() => triggerToggle()}
                >
                    <div className="checkbox__ball"></div>
                    <span className="checkbox__text"></span>
                </div>
            </div>
        </>
    )
}
export default ToggleButton