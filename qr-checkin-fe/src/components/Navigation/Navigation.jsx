import { Link } from 'react-router-dom';
import { useState } from 'react';

import './Navigation.css';

const Navigation = () => {
    const [sidebar, setSidebar] = useState(false);
    const [employeeMenu, setEmployeeMenu] = useState(false);
    const [attendanceMenu, setAttendanceMenu] = useState(false);
    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <div className="navigation-container shadow bg-white">
            <div>
                <h3 onClick={toggleSidebar} >
                    <i class="bi bi-list"></i>
                </h3>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >

                <div className="p-4">
                    <img src="assets/images/QR.png" alt="" height="30" width="30" />
                    <h3>QR-checkin</h3>
                </div>

                <ul className="routerLink p-3">
                    <Link to="/">
                        <li className="nav-item mb-3 p-2 rounded">
                            <i class="bi bi-pc-display-horizontal"></i>
                            <h4 className={sidebar ? "navName" : "navName fullsize"} >
                                Dashboard
                            </h4>
                        </li>
                    </Link>
                    <div onClick={() => setEmployeeMenu(!employeeMenu)}>
                        <li className="nav-item mb-3 p-2 rounded">
                            <i class="bi bi-people-fill"></i>
                            <h4 className={sidebar ? "navName" : "navName fullsize"} >
                                Employee Management
                            </h4>
                        </li>
                        {employeeMenu && (<ul className="flex flex-col gap-3 list-none">
                            <li>
                                <Link className="tags" to="employee">
                                    <div className="item-sub-menu">
                                        <div className="item-title">All employees</div>
                                    </div>
                                </Link>
                            </li>
                            {/* <li>
                                <Link className="tags" to="employee/departments">
                                    <div className="item-sub-menu">
                                        <div className="item-title">Departments</div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="tags" to="employee/position">
                                    <div className="item-sub-menu">
                                        <div className="item-title">Position</div>
                                    </div>
                                </Link>
                            </li> */}
                        </ul>)}
                    </div>
                    <div onClick={() => setAttendanceMenu(!attendanceMenu)}>
                        <li className="nav-item mb-3 p-2 rounded">
                            <i class="bi bi-people-fill"></i>
                            <h4 className={sidebar ? "navName" : "navName fullsize"} >
                                Work Management
                            </h4>
                        </li>
                        {attendanceMenu && (<ul className="flex flex-col gap-3 list-none">
                            <li>
                                <Link className="tags" to="working-schedule">
                                    <div className="item-sub-menu">
                                        <div className="item-title">Working Schedule</div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="tags" to="working-schedule/day-off-management">
                                    <div className="item-sub-menu">
                                        <div className="item-title">Day Off Management</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>)}
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;