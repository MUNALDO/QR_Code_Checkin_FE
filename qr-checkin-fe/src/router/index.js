import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Dashboard from "views/Dashboard/Dashboard";
import Attendance from "views/Attendance/Attendance";
import Employee from "views/Employee/Employee";

const titles = {
    '/': 'QR Checkin',
    '/attendance': 'Attendance',
    '/employee': 'Employee',
}

const Router = () => {
    // const location = useLocation()
    // useEffect(
    //     async () => (document.title = titles[location.pathname]),
    //     [location],
    // )  

    return (
        <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="attendance" element={ <Attendance/> } />
            <Route path="employee" element={ <Employee/> } />
        </Routes>
    );
};

export default Router;
