import React from 'react'
import './button.css'

const Button = (props) => {
    return (

        <div className="Button-container">
            <button type="submit" onClick={props.routes}>{props.name}</button>
        </div>

    )
}

export default Button
