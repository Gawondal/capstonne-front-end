import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Appointment from '../client/appointment';
import AddAppointment from './add-appointment';

export default function Home() {
    const [allAppointment, setAllAppointment] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState({});
    const [editMode, setEditMode] = useState(false);

    const getAllAppointment = () => {
        axios.get('https://didi-project-derriere.herokuapp.com/appointment/get')
        .then(res => {
            setAllAppointment(res.data)
        })
        .catch(error => {
            console.log('An Error has occured while fetching your appointment.', error);
        });
    } 

    const handleEditClick = (appointment) => {
        setAppointmentToEdit(appointment);
        setEditMode(true);
    }
    const handleEditSubmit = () => {
        setEditMode(false);
        getAllAppointment();
    }

    const handleDeleteClick = (id) => {

        axios.delete(`https://didi-project-derriere.herokuapp.com/appointment/delete/${id}`)
        .then(res => {
            setAllAppointment(allAppointment.filter(appointment => {
                return appointment.id !== id;
            }))
        })
        .catch(error => {
            console.log('An error has occured while trying to delete your appointment.', error);
        })
    }

    const renderAppointments = () => {
        return allAppointment.map(appointment => {
            return <Appointment appointment={appointment} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
        })
    }
// se pou loggin lan
    useEffect(() => {
        getAllAppointment();
        if(Cookies.get('username')) {
            setLoggedIn(true);
        }
    },[]);

    return (
        <div className="home-page-container">
            <h1 id="home-title">{loggedIn ? Cookies.get('username') : ''} , these are your appointments!</h1>
            {editMode ? <AddAppointment appointment={appointmentToEdit} edit={editMode} request={'update'} handleEditSubmit={handleEditSubmit}/> : renderAppointments()}

        </div>

    );
} 

