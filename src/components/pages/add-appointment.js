import React, { useState , useEffect} from 'react';
import { navigate } from 'hookrouter';

export default function AddAppointment(props) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [treatment, setTreatment] = useState('');
    const [requestType, setRequestType] = useState(props.request);
    const [request, setRequest] = useState('');
    const [appointmentToEdit, setAppointmentToEdit] = useState(props.appointment);
    const [endPoint, setEndPoint] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(endPoint, {
            method: `${request}`,
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                date: date,
                time: time,
                treatment: treatment
            })
        })
        .then(res => {
            console.log(res);
            if(props.edit === true) {
                props.handleEditSubmit()
            }else {
                navigate('/');
            }
        })
        
        .catch(error => console.log('An error has occured while fetching add-appointment.', error));
    }


    useEffect(() => {
        if(requestType === 'add') {
            setEndPoint(`https://didi-project-derriere.herokuapp.com/appointment/add`);
            setRequest('POST');
        } else if(requestType === 'update') {
            setEndPoint(`https://didi-project-derriere.herokuapp.com/appointment/update/${appointmentToEdit.id}`);
            setRequest('PUT');

            if(appointmentToEdit) {
                setName(appointmentToEdit.name);
                setDate(appointmentToEdit.date);
                setTime(appointmentToEdit.time);
                setTreatment(appointmentToEdit.treatment);
            } 
        }
    },[]);

    return (
        <form className ='add-appointment-form' onSubmit={handleSubmit}>
            <div className='input-container'>
                <div className="add-edit-header">{requestType === 'update' ? <h1>Edit-Appointment</h1> : <h1>Add-Appointment</h1>}</div>
                <input type='text' placeholder='Name' name='name' onChange={(e) => setName(e.target.value)} defaultValue={appointmentToEdit ? appointmentToEdit.name : ''}/>
                <input type='text' placeholder='Date' name='date' onChange={(e) => setDate(e.target.value)} defaultValue={appointmentToEdit ? appointmentToEdit.date : ''}/>
                <input type='text' placeholder='Time' name='time' onChange={(e) => setTime(e.target.value)} defaultValue={appointmentToEdit ? appointmentToEdit.time : ''}/>
                <input type='text' placeholder='Treatment' name='treatment' onChange={(e) => setTreatment(e.target.value)} defaultValue={appointmentToEdit ? appointmentToEdit.treatment : ''}/>
            </div>

            <button className="submit-btn" type='submit'>Submit</button>

        </form>
    );
} 