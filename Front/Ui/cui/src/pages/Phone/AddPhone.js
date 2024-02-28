import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



export default function AddPhone() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [router, setRouter] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}));
        setRouter(event.target.value);
    }

    const [devices, setDevices] = useState([]);
    useEffect(() => {
        getDevices();
    }, []);

    function getDevices() {
        axios.get('http://localhost:5000/devicelist').then(function (response) {
            console.log(response.data);
            setDevices(response.data);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://localhost:5000/phoneadd', inputs).then(function (response) {
            console.log(response.data);
            navigate('/listphone');
        });
    }

    return (
        <div>
            <div className="container h-100">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1>Add Phone</h1>
                        <Box sx={{ minWidth: 120 }}>
                            <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <div className="mb-3">
                                    <InputLabel name="namede" id="demo-simple-select-helper-label">Router</InputLabel>
                                    {devices.map((device, key) =>
                                        <Select key={key}
                                                displayEmpty
                                                labelId="ddemo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={router}
                                                label="Router"
                                                onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={device.namede}>{device.namede}</MenuItem>
                                        </Select>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <TextField name="tagpe" id="outlined-basic" label="Phone Tag" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="ownerpe" id="outlined-basic" label="Phone Owner" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="typepe" id="outlined-basic" label="Phone Type" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="linepe" id="outlined-basic" label="Line Number" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="idmacpe" id="outlined-basic" label="Phone Name" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="userdnpe" id="outlined-basic" label="Digist User"
                                               variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="passdnpe" id="outlined-basic" label="Digist Password"
                                               variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="codecpe" id="outlined-basic" label="Voice Codec" variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextField name="vcodecpe" id="outlined-basic" label="Class Codec"
                                               variant="outlined"
                                               onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <Button endIcon={<SendIcon/>} type="submit" name="add" variant="contained"
                                            label="Add Phone"></Button>
                                </div>
                            </FormControl>
                            </form>
                        </Box>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
}