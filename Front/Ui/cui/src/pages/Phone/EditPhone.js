import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Label, TextInput, Select, Badge} from 'flowbite-react';


export default function EditPhone() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const {id_phone} = useParams();

    useEffect(() => {
        getPhone();
    }, []);

    function getPhone() {
        axios.get(`http://localhost:5000/phonedetails/${id_phone}`).then(function (response) {
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
        axios.put(`http://localhost:5000/phoneupdate/${id_phone}`, inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-8">
                    <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">PHONE EDIT</span>
                    </h2>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="max-w-md gap-2">
                            <div className="mb-2 block">
                                <Label htmlFor="router" value="Select Router"/>

                                <Select id="routers" required name="routerpe">
                                    <option>{inputs.routerpe}</option>
                                    <option>None</option>
                                </Select>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="tag" value="Phone Tag"/>
                                <TextInput id="tape" type="text" placeholder="Phone Tag" name="tagpe"
                                           value={inputs.tagpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="owner" value="Phone Owner"/>
                                <TextInput id="ownerpe" type="text" placeholder="Phone Owner" name="ownerpe"
                                           value={inputs.ownerpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Phone Type"/>
                                <TextInput id="typepe" type="text" placeholder="Phone Type" name="typepe"
                                           value={inputs.typepe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="line" value="Line Number"/>
                                <TextInput id="linepe" type="text" placeholder="Line Number" name="linepe"
                                           value={inputs.linepe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="Phone Name" value="Phone Name"/>
                                <TextInput id="idmacpe" type="text" placeholder="Phone Name" name="idmacpe"
                                           value={inputs.idmacpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="Digist User" value="Digist User"/>
                                <TextInput id="userdnpe" type="text" placeholder="Digist User" name="userdnpe"
                                           value={inputs.userdnpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="Digist Pass" value="Digist Pass"/>
                                <TextInput id="passdnpe" type="text" placeholder="Digist User" name="passdnpe"
                                           value={inputs.passdnpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="Voice Codec" value="Voice Codec"/>
                                <TextInput id="codecpe" type="text" placeholder="Voice Codec" name="codecpe"
                                           value={inputs.codecpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <Label htmlFor="Class Codec" value="Class Codec"/>
                                <TextInput id="vcodecpe" type="text" placeholder="Class Codec" name="vcodecpe"
                                           value={inputs.vcodecpe}
                                           onChange={handleChange} required/>
                            </div>
                            <div className="mb-2 block">
                                <br/>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button gradientDuoTone="greenToBlue" type="submit" name="add">Add Phone</Button>
                             </div>
                        </div>

                    </form>
                </div>
                <div className="col-3"></div>

            </div>
        </div>
    );
}