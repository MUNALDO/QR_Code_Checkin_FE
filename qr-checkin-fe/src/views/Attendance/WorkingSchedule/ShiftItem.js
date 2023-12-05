import { Link } from "react-router-dom";

const ShiftItem = (props) => {
    const { id, name, code, shift_type, time_slot } = props;

    return (
        <tr className="tr-item">
            <td className="p-4 hover:text-buttonColor2">
                <h2 className="text-left">
                    <Link className="cursor-pointer flex flex-col">{name}</Link>
                </h2>
            </td>
            <td className="p-4 text-left">{code}</td>
            <td className="p-4">{shift_type}</td>
            <td className="p-4 flex flex-row gap-3">
                {time_slot?.detail?.map((item, index) => (
                    <div key={index}>{item?.start_time}-{item?.end_time}</div>
                ))}
            </td>
        </tr>
    );
};

export default ShiftItem;