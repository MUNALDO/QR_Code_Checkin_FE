import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import DeleteIcon from "../../assets/images/icon-delete.png"
import ProfileIcon from "../../assets/images/icon-profile.png"
import IconActive from "../../assets/images/icon-active.png"
import { positionList } from "assets/data/data"
import { roleList, roleListForInhaber } from "assets/data/data"
import { genderList } from "assets/data/data"
import ScheduleTable from "./ScheduleTable"
const ProfileEmployee = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileState, setProfileState] = useState(true);
    const [scheduleState, setScheduleState] = useState(false);
    const [departmentList, setDepartmentList] = useState()
    const [checkRole, setCheckRole] = useState(false)

    const [checkInhaber, setCheckInhaber] = useState(false)
    const [checkManager, setCheckManager] = useState(false)
    const [checkAdmin, setCheckAdmin] = useState(false)

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
            try {
                const response = await axios.get(`https://qr-code-checkin.vercel.app/api/admin/manage-all/search-specific?details=${id}`, { withCredentials: true });
                console.log(response.data.message);
                setUser(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        const getAllDepartments = async () => {
            try {
                const response = await axios.get('https://qr-code-checkin.vercel.app/api/admin/manage-department/get-all', { withCredentials: true });
                setDepartmentList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getUser();
        getAllDepartments()
    }, [id]);

    useEffect(() => {
        if (user && user[0]?.role !== "Employee") {
            setCheckRole(false)
        }

        if (user && user[0]?.role === "Employee") {
            setCheckRole(true)
        }

        if (userObject?.role === 'Admin') {
            setCheckAdmin(true)
            setCheckInhaber(false)
            setCheckManager(false)
        }

        if (userObject?.role === 'Inhaber') {
            setCheckAdmin(false)
            setCheckInhaber(true)
            setCheckManager(false)
        }
    }, [user, userObject?.role]);


    const [editingData, setEditingData] = useState({
        name: '',
        id: '',
        email: '',
        department: '',
        role: '',
        position: '',
        status: '',
        gender: '',
        dob: '',
        address: '',
        default_total_dayOff: '',
        house_rent_money: ''
    });

    const handleCancel = () => {
        if (user) {
            setEditingData({
                name: user[0]?.name || '',
                id: user[0]?.id || '',
                email: user[0]?.email || '',
                department: user[0]?.department_name || '',
                position: user[0]?.position || '',
                status: user[0]?.status || '',
                gender: user[0]?.gender || '',
                dob: user[0]?.dob || '',
                address: user[0]?.address || '',
                role: user[0]?.role || '',
                default_total_dayOff: user[0]?.default_total_dayOff || '',
                house_rent_money: user[0]?.house_rent_money || '',
            });
        }
    };
    useEffect(() => {
        // Update editingData whenever user changes
        if (user) {
            setEditingData({
                name: user[0]?.name || '',
                id: user[0]?.id || '',
                email: user[0]?.email || '',
                department: user[0]?.department_name || '',
                position: user[0]?.position || '',
                role: user[0]?.role || '',
                status: user[0]?.status || '',
                gender: user[0]?.gender || '',
                dob: user[0]?.dob || '',
                address: user[0]?.address || '',
                default_total_dayOff: user[0]?.default_total_dayOff || '',
                house_rent_money: user[0]?.house_rent_money || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (userObject?.role === "Admin") {
            try {
                const { data } = await axios.put(`https://qr-code-checkin.vercel.app/api/admin/manage-employee/update?employeeID=${id}`,
                    {
                        id: editingData.id,
                        name: editingData.name,
                        email: editingData.email,
                        department_name: editingData.department,
                        role: editingData.role,
                        position: editingData.position,
                        status: editingData.status,
                        dob: editingData.dateOfBirth,
                        address: editingData.address,
                        gender: editingData.gender,
                        default_total_dayOff: editingData.default_total_dayOff,
                        house_rent_money: editingData.house_rent_money,
                    },
                    { withCredentials: true },
                );


            } catch (error) {
                // Handle error
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false);
            }
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        if (userObject?.role === "Inhaber") {
            try {
                const { data } = await axios.put(`https://qr-code-checkin.vercel.app/api/inhaber/manage-employee/update?inhaber_name=${userObject?.name}&employeeID=${id}`,
                    {
                        id: editingData.id,
                        name: editingData.name,
                        email: editingData.email,
                        role: editingData.role,
                        department_name: editingData.department,
                        position: editingData.position,
                        status: editingData.status,
                        dob: editingData.dateOfBirth,
                        address: editingData.address,
                        gender: editingData.gender,
                        default_total_dayOff: editingData.default_total_dayOff,
                        house_rent_money: editingData.house_rent_money
                    },
                    { withCredentials: true },
                );


            } catch (error) {
                // Handle error
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false);
            }
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }

    };
    return (
        <div className="ml-[260px] flex flex-col font-Changa text-textColor">
            {loading && (<div className="absolute flex w-full h-full justify-center mt-52">
                <div className="loader"></div>
            </div>)}
            <div className="p-5 flex flex-row items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Employee's Information</h1>
                    <div className="flex flex-row">
                        <Link className="text-xl font-semibold leading-6 hover:underline" to="/">Dashboard</Link>
                        <Link to="/employee" className="text-[#6c757d] font-xl hover:text-black">/ Employees</Link>
                        <span className="text-[#6c757d] font-xl hover:text-black">/ Employee's Information</span>
                    </div>
                </div>
                <div className="flex flex-row px-4 gap-4">
                    <button className="bg-red-600 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md hover:bg-red-800">
                        <img className="w-4 h-4" src={DeleteIcon} />Delete Employee
                    </button>
                </div>
            </div>
            <div className="border border-solid border-t-[#6c757d]"></div>
            <div className="bg-white h-auto w-full flex flex-col p-4 rounded-md">
                <div className="flex flex-row gap-4 text-xl">
                    <div
                        onClick={() => {
                            setScheduleState(false)
                            setProfileState(true)
                        }}
                        className={`hover:text-buttonColor1 cursor-pointer ${profileState ? "text-buttonColor1 underline decoration-buttonColor1" : ""}`}>Basic Information</div>
                    {checkRole && (<div
                        onClick={() => {
                            setScheduleState(true)
                            setProfileState(false)
                        }}
                        className={`hover:text-buttonColor1 cursor-pointer ${scheduleState ? "text-buttonColor1 underline decoration-buttonColor1" : ""}`}>Schedule's Calendar</div>)}
                </div>
            </div>
            {user?.map((index, item) =>
                <div className="bg-[#f0f2f5] w-full flex flex-row p-5 font-Changa text-textColor gap-4">
                    {profileState && (<div className="bg-white h-auto w-1/3 flex flex-col p-4 rounded-md">
                        <div className="flex flex-col justify-center items-center gap-1 mt-4">
                            <img src={ProfileIcon} className="w-32 h-32" />
                            <span className="mt-3 font-bold text-xl">{user[0]?.name}</span>
                            <span className="text-base">Employee's ID: {user[0]?.id}</span>
                            <div className="flex gap-2 justify-center items-center w-full h-full">
                                <img className="w-4 h-4" src={IconActive} />
                                <span className="text-buttonColor2">{user[0]?.status}</span>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-1 mt-3 text-base">
                                <div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Name</span>
                                    <span className="w-2/3 px-2">{user[0]?.name}</span>
                                </div>
                                {checkRole && (<div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Gender</span>
                                    <span className="w-2/3 px-2">{user[0]?.gender}</span>
                                </div>)}
                                {checkRole && (<div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Address</span>
                                    <span className="w-2/3 px-2">{user[0]?.address}</span>
                                </div>)}
                                {checkRole && (<div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Date of Birth</span>
                                    <span className="w-2/3 px-2">{user[0]?.dob}</span>
                                </div>)}
                                <div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Email</span>
                                    <span className="w-2/3 px-2">{user[0]?.email}</span>
                                </div>
                                <div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Department</span>
                                    <span className="w-2/3 px-2">{user[0]?.department_name}</span>
                                </div>
                                <div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Role</span>
                                    <span className="w-2/3 px-2">{user[0]?.role}</span>
                                </div>
                                {checkRole && (<div className="flex flex-wrap w-full items-center justify-center">
                                    <span className="text-[#6c757d] w-1/3 text-right px-3">Position</span>
                                    <span className="w-2/3 px-2">{user[0]?.position}</span>
                                </div>)}
                            </div>
                        </div>
                    </div>)}
                    {profileState && (<div className="bg-white h-auto w-2/3 flex flex-col p-4 rounded-md">
                        <div className="flex flex-col gap-1 mt-4">
                            <div className="text-xl font-bold">Employee's Information</div>
                            <form
                                className="ml-20 mt-10 flex flex-col gap-4"
                                onSubmit={handleSubmit}>
                                <div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-3/4"
                                        value={editingData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="id">Employee's ID:</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        className="w-3/4"
                                        value={editingData.id}
                                        onChange={handleChange}
                                    />
                                </div>
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="department">Gender:</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="w-3/4"
                                        value={editingData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            {editingData.gender || 'Select Gender'}
                                        </option>
                                        {genderList?.map(({ index, name }) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>)}
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="dob">Date of Birth:</label>
                                    <input
                                        type="text"
                                        id="dob"
                                        name="dob"
                                        className="w-3/4"
                                        value={editingData.dob}
                                        onChange={handleChange}
                                    />
                                </div>)}
                                <div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-3/4"
                                        value={editingData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="address">Address:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="w-3/4"
                                        value={editingData.address}
                                        onChange={handleChange}
                                    />
                                </div>)}
                                {checkRole ? (
                                    checkAdmin && (
                                        <div className="flex flex-wrap w-[600px] items-center">
                                            <label className="w-1/4 text-right p-4" htmlFor="department">
                                                Department:
                                            </label>
                                            <select
                                                id="department"
                                                name="department"
                                                className="w-3/4"
                                                value={editingData.department}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>
                                                    {editingData.department || 'Select Department'}
                                                </option>
                                                {departmentList?.map(({ name, index }) => (
                                                    <option key={index} value={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-wrap w-[600px] items-center">
                                        <label className="w-1/4 text-right p-4" htmlFor="department">
                                            Department:
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            name="department"
                                            className="w-3/4"
                                            value={editingData.department}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                                {checkAdmin && (checkRole ? (< div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="w-3/4"
                                        value={editingData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            {editingData.role || 'Select Role'}
                                        </option>
                                        {roleList?.map(({ name, index }) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>) : (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        className="w-3/4"
                                        value={editingData.role}
                                        onChange={handleChange}
                                    />
                                </div>))}

                                {checkInhaber && (checkRole ? (< div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="role">Role:</label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="w-3/4"
                                        value={editingData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            {editingData.role || 'Select Role'}
                                        </option>
                                        {roleListForInhaber?.map(({ name, index }) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>) : (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="role">Role:</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        className="w-3/4"
                                        value={editingData.role}
                                        onChange={handleChange}
                                        readOnly={true}
                                    />
                                </div>))}

                                {/* {checkRole ?
                                    (checkAdmin && (< div className="flex flex-wrap w-[600px] items-center">
                                        <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="w-3/4"
                                            value={editingData.role}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                {editingData.role || 'Select Role'}
                                            </option>
                                            {roleList?.map(({ name, index }) => (
                                                <option key={index} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>)) : (
                                        <div className="flex flex-wrap w-[600px] items-center">
                                            <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                            <input
                                                type="text"
                                                id="role"
                                                name="role"
                                                className="w-3/4"
                                                value={editingData.role}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                {checkRole ?
                                    (checkInhaber && (< div className="flex flex-wrap w-[600px] items-center">
                                        <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="w-3/4"
                                            value={editingData.role}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                {editingData.role || 'Select Role'}
                                            </option>
                                            {roleListForInhaber?.map(({ name, index }) => (
                                                <option key={index} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>)) : (
                                        <div className="flex flex-wrap w-[600px] items-center">
                                            <label className="w-1/4 text-right p-4" htmlFor="department">Role:</label>
                                            <input
                                                type="text"
                                                id="role"
                                                name="role"
                                                className="w-3/4"
                                                value={editingData.role}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )} */}
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="department">Position:</label>
                                    <select
                                        id="position"
                                        name="position"
                                        className="w-3/4"
                                        value={editingData.position}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            {editingData.position || 'Select Position'}
                                        </option>
                                        {positionList?.map(({ name, index }) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>)}
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="phone">Days Off (per year):</label>
                                    <input
                                        type="text"
                                        id="default_total_dayOff"
                                        name="default_total_dayOff"
                                        className="w-3/4"
                                        value={editingData.default_total_dayOff}
                                        onChange={handleChange}
                                    />
                                </div>)}
                                {checkRole && (<div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="phone">House renting money:</label>
                                    <input
                                        type="text"
                                        id="house_rent_money"
                                        name="house_rent_money"
                                        className="w-3/4"
                                        value={editingData.house_rent_money}
                                        onChange={handleChange}
                                    />
                                </div>)}
                                <div className="flex flex-wrap w-[600px] items-center">
                                    <label className="w-1/4 text-right p-4" htmlFor="status">Status:</label>
                                    <input
                                        type="text"
                                        id="status"
                                        className="w-3/4"
                                        name="status"
                                        value={editingData.status}
                                        onChange={handleChange}
                                    />
                                </div>
                                {checkRole && (<div className="flex flex-row w-full justify-center gap-6">
                                    <button onClick={handleCancel} className="mt-10 w-1/3 bg-buttonColor1 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md hover:bg-cyan-800">
                                        Cancel
                                    </button>
                                    <button type="submit" className="mt-10 w-1/3 bg-buttonColor1 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md hover:bg-cyan-800">
                                        Save Changes
                                    </button>
                                </div>)}
                            </form>
                        </div>
                    </div>)
                    }
                    {scheduleState && <ScheduleTable id={id} name={editingData.name} department={editingData.department} role={editingData.role} position={editingData.position} />}
                </div >
            )}
        </div >
    )
}

export default ProfileEmployee