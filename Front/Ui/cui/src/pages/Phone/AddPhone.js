import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {Label, Select, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from 'flowbite-react';
import {Link, useNavigate} from "react-router-dom";


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
                                        <Label htmlFor="Router" value="Select Router"/>
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
                                        <Label htmlFor="phonetag" value="Phone Tag"/>
                                        <TextInput name="tagpe" id="phonetag" type="number" min="1"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Select Owner"/>
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

                                        <Label value="Phone Type"/>
                                        <TextInput name="typepe" id="outlined-basic" label="Phone Type"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Line Number"/>
                                        <TextInput name="linepe" id="outlined-basic" label="Line Number"
                                                   variant="outlined"
                                                   type="number"
                                                   min="1"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Phone Name"/>
                                        <TextInput name="idmacpe" id="outlined-basic" label="Phone Name"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Digist User"/>
                                        <Select
                                            label="Digist User"
                                            onChange={handleChange}
                                        >

                                            <option name="Digist User" value="">None</option>
                                            {directorys.map((directory, key2) =>
                                                <option key={key2} name="numberdn"
                                                        value={directory.numberdn}>{directory.numberdn}</option>
                                            )}
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Digist Password"/>
                                        <TextInput name="passdnpe" id="outlined-basic" type="password"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Voice Codec"/>
                                        <Select
                                            label="Voice Codec"
                                            onChange={handleChange}
                                        >

                                            <option name="Voice Codec" value="">None</option>
                                            <option>G711Ulaw</option>
                                            <option>G711Alaw</option>
                                            <option>G722</option>
                                            <option>G729</option>
                                            <option>G726</option>

                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <Label value="Class Codec"/>
                                        <TextInput name="vcodecpe" id="outlined-basic" type="number" min="1"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Button gradientDuoTone="cyanToBlue" type="submit" name="add">Add Phone</Button>
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