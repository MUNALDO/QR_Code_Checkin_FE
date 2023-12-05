import "./EmployeeItem.css"
import { Link } from "react-router-dom"
import IconActice from "../../assets/images/icon-active.png"
const EmployeeItem = (props) => {
    const { id, name, email, status, department_name, role, position } = props
    return (
        <tr className="tr-item">
            <td className="p-2 hover:text-buttonColor2">
                <h2 className="text-left">
                    {/* <Link className="img-table-item-block" to={`viewprofile/${uuid}`}>
                        <img className="img-table-item" src={imageUrl} alt="" />
                    </Link> */}
                    <Link className="cursor-pointer flex flex-col" to={`view-profile/${id}`}>{name}
                        <span className="text-xs text-neutral-400">{role}</span>
                    </Link>
                </h2>
            </td>
            <td className="p-2">{id}</td>
            <td className="p-2">{email}</td>
            <td className="p-2">{department_name}</td>
            <td className="p-2">{role}</td>
            <td className="p-2">{position}</td>
            <td className="p-2 flex gap-2 justify-center items-center w-full h-full mt-2">
                <img className="w-4 h-4" src={IconActice} />
                <span className="text-buttonColor2">{status}</span>
            </td>
        </tr>
    )
}

export default EmployeeItem