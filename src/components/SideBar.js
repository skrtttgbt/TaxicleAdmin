import React from 'react'
import { BsFillPersonLinesFill, BsGrid1X2Fill } from 'react-icons/bs'
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SideBar({openSidebarToggle,  OpenSidebar}) {
    const navigate = useNavigate()
    const handleLogOut = () => {
        //shut session
        // axios.get('https://taxicleserver.onrender.com/admin-logout' ,{withCredentials:true})
        // .then(res=>{
        //     if(res.data.Status === "Success") {
        //         navigate('/') // to home 
        //     }
        // }).catch(err => console.log(err))
    }
  return (
    <aside id="sidebar"  className= {openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <RiAdminFill className='icon'/> ADMIN
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}><AiFillCloseCircle/></span>
        </div>
        <ul className='sidebar-list'>
            <a href='/dashboard'>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> DASHBOARD
                </li>
            </a>
            <a href='/user-management'>
                <li className='sidebar-list-item'>
                    <BsFillPersonLinesFill className='icon'/> USER MANAGEMENT
                </li>
            </a>
            <Link className="signout" to="/" onClick={handleLogOut}>
                    <li className='sidebar-list-item'>
                            <FaSignOutAlt className='icon'/> SIGN OUT
                    </li>
            </Link>

        </ul>
    </aside>
  )
}

export default SideBar
