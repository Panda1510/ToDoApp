import React from 'react'
import './MyListItemText.css'


function MyListItemText(props) {
    return (
        <div className = 'list-item'>
            <h1>{props.primary}</h1>
            <p>{props.secondary}</p>
        </div>
    )
}

export default MyListItemText
