import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

export default function EditDevice(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const {id_device} = useParams();

    useEffect(() => {
        getDevice();
    },[]);

    function getDevice() {
        axios.get(`http://localhost:5000/devicedetails/${id_device}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:5000/deviceupdate/${id_device}`, inputs).then(function(response) {
            console.log(response.data);
            navigate('/');
        });
    }

    return (
        <div>
            <div className="container h-100">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1>Edit Device</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" value={inputs.namede} className="form-control" name="namede"
                                       onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label>Device Type</label>
                                <input type="text" value={inputs.typede} className="form-control" name="typede"
                                       onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label>IP Address</label>
                                <input type="text" value={inputs.ipaddrde} className="form-control" name="ipaddrde"
                                       onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label>Device Protocol</label>
                                <input type="text" value={inputs.protocolde} className="form-control" name="protocolde"
                                       onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label>User Access</label>
                                <input type="text" value={inputs.userde} className="form-control" name="userde"
                                       onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" value={inputs.passde} className="form-control" name="passde"
                                       onChange={handleChange}/>
                            </div>
                            <button type="submit" name="update" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                    <div className="col2"></div>
                </div>
            </div>
        </div>
    );
}