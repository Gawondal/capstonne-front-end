import React from 'react';
import Home from '../pages/home';
import AddAppointment from '../pages/add-appointment';
import Login from '../pages/login';
import SignUp from '../pages/sign-up';
import Appointment from '../client/appointment';


const routes = {
    '/': () => <Home />,
    '/add-appointment': () => <AddAppointment request={'add'}/>,
    '/appointment': () => <Appointment />,
    '/login': () => <Login />,
    '/sign-up': () => <SignUp />,
}

export default routes;