import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import axios from "axios";

const ScheduleTable = (props) => {
    const { id } = props
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [addShiftFormState, setShiftFormState] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://qr-code-checkin.vercel.app/api/admin/manage-date-design/get-all?employeeID=${id}`, { withCredentials: true });
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchData();
    }, [id]);

    console.log(employeeData);

    const renderTileContent = ({ date }) => {
        if (!employeeData || !employeeData.message) return null;

        const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });

        const shiftCodesForDate = employeeData.message
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.date);
          return scheduleDate.toDateString() === date.toDateString();
        })
        .map((schedule) => schedule.shift_design.map((shift) => shift.shift_code))
        .flat();
  
      return (
        <div className={`calendar-tile ${shiftCodesForDate.length > 0 ? "scheduled" : ""}`}>
          {/* You can customize the content of the tile here */}
          {shiftCodesForDate.length > 0 ? (
            shiftCodesForDate.map((shiftCode, index) => (
              <div key={index}>{shiftCode}</div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      );
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };

    const [formData, setFormData] = useState({
        data: {
            shift_code: ''
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            data: {
                ...prevData.data,
                [name]: value,
            },
        }));
    };

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    console.log(userObject);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userObject.role === 'Admin') {
            try {
                const { data } = await axios.post(
                    `https://qr-code-checkin.vercel.app/api/admin/manage-date-design/create?employeeID=${id}`,
                    {
                        date: selectedDate,
                        shift_code: formData.data.shift_code,
                    },
                    { withCredentials: true }
                );

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                // Handle error
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleClickDay = (value, event) => {
        setShiftFormState(true)
        const formattedDate = value.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
        console.log("Selected date:", formattedDate);
        setSelectedDate(formattedDate);
        console.log(value);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full gap-4 font-Changa text-textColor">
            <h2 className="text-2xl font-bold">Schedule Calendar</h2>
            {selectedYear && (
                <Calendar
                    onChange={handleMonthChange}
                    onClickDay={handleClickDay}
                    value={selectedMonth}
                    view="month"
                    showNeighboringMonth={false}
                    tileContent={renderTileContent}
                />
            )}

            {/* //---------------------------------------------------------------- ADD SHIFT FOR EMPLOYEE ----------------------------------------------------------------// */}
            {addShiftFormState && (<div className="fixed top-0 bottom-0 right-0 left-0 z-20 font-Changa">
                <div
                    onClick={() => setShiftFormState(false)}
                    className="absolute top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.45)] cursor-pointer"></div>
                <div className="absolute w-[500px] top-0 right-0 bottom-0 z-30 bg-white">
                    <div className="w-full h-full">
                        <div className="flex flex-col mt-8">
                            <div className="flex flex-row justify-between px-8 items-center">
                                <div className="font-bold text-xl">Crete Employee</div>
                                <div
                                    onClick={() => setShiftFormState(false)}
                                    className="text-lg border border-solid border-[rgba(0,0,0,.45)] py-1 px-3 rounded-full cursor-pointer">x</div>
                            </div>
                            <div className="w-full border border-solid border-t-[rgba(0,0,0,.45)] mt-4"></div>
                            <div className="flex flex-col px-8 w-full mt-7">
                                <form
                                    className="flex flex-col gap-6 w-full justify-center items-center"
                                    onSubmit={handleSubmit}>
                                    {loading && (<div className="absolute flex w-full h-full items-center justify-center">
                                        <div className="loader"></div>
                                    </div>)}
                                    <div className="w-full h-auto flex flex-col gap-2">
                                        <div className="flex flex-row gap-2">
                                            <span className="text-rose-500">*</span>
                                            <span className="">Shift's ID</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="shift_code"
                                            required
                                            value={formData.data.shift_code}
                                            onChange={handleChange}
                                            placeholder="Enter shift ID..."
                                        />
                                    </div>
                                    <div
                                        className=" bg-buttonColor2 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid py-3 rounded-md cursor-pointer hover:bg-emerald-700 w-full">
                                        <button type="submit" className="w-full">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default ScheduleTable;