import React from 'react';

export default function Appointment(props) {
    const {name, date, time, treatment, id} = props.appointment;

    return (
        <div className="appointment-container">
            <div className="name">{name}</div>
            <div className="date">{date}</div>
            <div className='time'>{time}</div>
            <div className='treatment'>{treatment}</div>

            <button className="appointment-btn" onClick={() => props.handleDeleteClick(id)}>Delete</button>
            <button className="appointment-btn" onClick={() => props.handleEditClick(props.appointment)}>Edit</button>
        </div>
    );
}