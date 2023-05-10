import { NavLink, Outlet } from "react-router-dom"
import exam from "../../images/exam.png"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { BiHomeAlt2 } from "react-icons/bi"
import { IoCreateOutline, IoPersonAddOutline } from "react-icons/io5"
import { HiUserGroup } from "react-icons/hi"

const style = {
    link: "w-[80%] py-2 px-3 rounded-lg hover:bg-[#ff9248] hover:text-white tracking-wide flex items-center transition",
    link_selected: "w-[80%] py-2 px-3 rounded-lg bg-[#ff9248] text-white font-bold tracking-wide flex items-center"
}

const Navbar = () => {

    return (
        <div className="flex h-screen w-screen">
            <div className="w-[15%] h-full flex flex-col">
                <div className="flex items-center justify-center"><img className="p-5 w-[70%]" src={exam} alt="" /></div>
                <div className="flex flex-col items-center space-y-1 text-sm">
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/"}><BiHomeAlt2 />&nbsp;Dashboard</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/register"}><IoPersonAddOutline />&nbsp;Register</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/sections"}><HiUserGroup />&nbsp;Section</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/create"}><IoCreateOutline />&nbsp;Create</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/upload"}><AiOutlineCloudUpload />&nbsp;Upload</NavLink>
                </div>
            </div>
            <div className="w-[85%]">
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar