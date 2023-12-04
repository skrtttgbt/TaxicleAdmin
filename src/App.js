import './App.css';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Home from './pages/Home';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import Report from './pages/Report';

function App() {
  const [openSidebarToggle, setOpen] = useState(false)

  const OpenSidebar = () => {
    setOpen(!openSidebarToggle)
  }
  
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Dashboard' element={      
      <div className='container-browser grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SideBar openSidebarToggle={openSidebarToggle}  OpenSidebar={OpenSidebar}/>
      <Home/>
      </div>}></Route>
      <Route path='/user-management' element={
      <div className='container-browser grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SideBar openSidebarToggle={openSidebarToggle}  OpenSidebar={OpenSidebar}/>
      <UserManagement/>
      </div>}></Route>

      <Route path='/report' element={
      <div className='container-browser grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SideBar openSidebarToggle={openSidebarToggle}  OpenSidebar={OpenSidebar}/>
      <Report/>
      </div>}></Route>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
