import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDevice() {
    const navigate = useNavigate();

    const [input, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:5000/deviceadd', inputs).then(function(response) {
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
                        <h1>Add Device</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="from-control" name="namede" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Type</label>
                                <input type="text" className="form-control" name="typede" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Protocol</label>
                                <input type="text" className="form-control" name="protocolde" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>UserAccess</label>
                                <input type="text" className="form-control" name="userde" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control" name="passde" onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" name="add">Add</button>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
}