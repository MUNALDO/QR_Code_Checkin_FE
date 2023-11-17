import { Routes, Route } from "react-router-dom";

import Dashboard from "views/Dashboard/Dashboard";
import Attendance from "views/Attendance/Attendance";
import Employee from "views/Employee/Employee";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="attendance" element={ <Attendance/> } />
            <Route path="employee" element={ <Employee/> } />
        </Routes>
    );
};

export default Router;
