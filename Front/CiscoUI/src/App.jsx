import React, {} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ListDevicePage from "./pages/ListDevicePage";
import AddDevice from "./pages/AddDevice";
import EditDevice from "./pages/EditDevice";

function App() {
    return (
        <div className='vh-100 gradiant-custom'>
            <div className='container'>
                <h1 className='page-header text-center'>List Devices</h1>

                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<ListDevicePage />} />
                        <Route path='/addnewdevice' element={<AddDevice />} />
                        <Route path='/device/:id_device/edit' element={<EditDevice />} />
                    </Routes>

                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
