import React, { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import {BrowserRouter, Router, Route} from 'react-router-dom'


function App() {
    // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    // const OpenSidebar = () => {
    //     setOpenSidebarToggle(!openSidebarToggle)
    // }

    return (
        <div className='grid-container'>
            {/* <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Home /> */}
            <div className='container'>
                <h1 className='page-header text-center'>Add Device</h1>

                <BrowserRouter>
                    <Router>
                        <Route path='/' element={<ListDevicePage />} />
                        <Route path='/addnewdevice' element={<AddDevice />} />
                        <Route path='device/:id_device.edit' elemnt={<EditDevice />} />
                    </Router>
                </BrowserRouter>
            </div>

        </div>
    )
}

export default App