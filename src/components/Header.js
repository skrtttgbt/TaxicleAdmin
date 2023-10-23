import React from 'react'
import {BsJustify} from 'react-icons/bs'
import Logo from '../taxicle.png'

function Header({OpenSidebar}) {
  return (
    <header className='header'>   
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='logo'>
          <img src={Logo} alt='TAXICLE LOGO' />
        </div>
        <div></div>
    </header>
  )
}

export default Header
