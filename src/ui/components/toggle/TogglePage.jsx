import React, { useState, useEffect } from 'react'
import './toggle.css'

const TogglePage = ({ defaultChecked, disabled, onChange }) => {

    const [toggle, setToggle] = useState(defaultChecked)

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
                    className={`checkbox ${toggle && "checkbox--off"}`}
                    onClick={() => triggerToggle()}
                >
                    <div className="checkbox__ball"></div>
                    <span className="checkbox__text"></span>
                </div>
            </div>
        </>
    )
}
export default TogglePage