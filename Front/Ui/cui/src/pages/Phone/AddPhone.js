import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Label, Select, TextInput } from 'flowbite-react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



export default function AddPhone() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}));

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

    const [directorys, setDirectorys] = useState([]);
    useEffect(() => {
        getDirectorys();
    }, []);

    function getDirectorys() {
        axios.get(`http://localhost:5000/directorylist`).then(function (response) {
            console.log(response.data);
            setDirectorys(response.data);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/phoneadd', inputs).then(function (response) {
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
                        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ADD PHONE</span>
                        </h2>
                        <Box sx={{minWidth: 120}}>
                        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                            <FormControl>
                                    <div className="mb-3">
                                    <Label htmlFor="Router" value="Select Router" />
                                            <Select
                                                    label="Router"
                                                    onChange={handleChange}
                                            >
                                                <option name="router" value="">None</option>
                                                {devices.map((device, key) =>
                                                    <option key={key} name="routerpe"
                                                          value={device.namede}>{device.namede}</option>
                                                )}
                                            </Select>
                                    </div>
                                <div className="mb-3">
                                        <Label htmlFor="phonetag" value="Phone Tag" />
                                        <TextInput name="tagpe" id="phonetag" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label htmlFor="countries" value="Select Owner" />
                                            <Select
                                                    label="Owner"
                                                    onChange={handleChange}
                                            >

                                                <option name="owner" value="">None</option>
                                                {directorys.map((directory, key2) =>
                                                    <option key={key2} name="ownerpe"
                                                        value={directory.namedn}>{directory.namedn}</option>
                                                )}
                                            </Select>
                                    </div>
                                <div className="mb-3">
                                        <TextField name="typepe" id="outlined-basic" label="Phone Type"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="linepe" id="outlined-basic" label="Line Number"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="idmacpe" id="outlined-basic" label="Phone Name"
                                                   variant="outlined"
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
                                        <TextField name="codecpe" id="outlined-basic" label="Voice Codec"
                                                   variant="outlined"
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