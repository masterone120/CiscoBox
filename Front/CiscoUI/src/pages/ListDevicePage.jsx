import React, {useEffect, useEstate} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default function ListDevicePage() {
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        getDevices();
    }, []);

    function getDevices() {
        exios.get('http://127.0.0.1:5000/listdevices').then(function(response) {
            console.log(response.data);
            setDevices(response.data);
        });
    }
    
    const deleteDevice = (id_device) => {
        axios.delete('http://127.0.0.1:5000/devicedelete/${id_device}').then(function(response){
            console.log(response.data);
            getDevices();
        });
        alert("Successfully deleted");
    }

    return (
        <div className='container h-100'>
            <div className='row h-100'>
                <div className='col-12'>
                    <p><Link to='/addnewdevice' className='btn btn-success'>Add New Device</Link></p>
                    <h1>List Devices</h1>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Protocole</th>
                                <th>UserAccess</th>
                                <th>PasswordAccess</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device, key) => 
                                <tr key={key}>
                                    <td>{device.id_device}</td>
                                    <td>{device.namede}</td>
                                    <td>{device.typede}</td>
                                    <td>{device.protocolde}</td>
                                    <td>{device.userde}</td>
                                    <td>{device.passde}</td>
                                    <td>
                                        <Link to={`device/${device.id_device}/edit`} className='btn btn-success' style={{marginRight:"10px"}}>Edit</Link>
                                        <button onClick={() => deleteDevice(device.id_device)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
}