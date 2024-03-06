import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function EditPhone() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const {id_phone} = useParams();

    useEffect(() => {
        getPhone();
    },[]);

    function getPhone() {
        axios.get(`http://localhost:5000/phonedetails/${id_phone}`).then(function(response)  {
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
        axios.put(`http://localhost:5000/phoneupdate/${id_phone}`, inputs).then(function(response) {
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
                        <h1>Edit Phone</h1>
                        <Box sx={{minWidth: 120}}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth>
                                    <div className="mb-3">
                                        <InputLabel name="router"
                                                    id="demo-simple-select-helper-label">Router</InputLabel>
                                            <Select
                                                    displayEmpty
                                                    name="routerpe"
                                                    labelId="ddemo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={inputs.routerpe}
                                                    label="Router"
                                                    onChange={handleChange}
                                            >
                                                <MenuItem value="" name="routerpe">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem name="routerpe" value={inputs.routerpe}>{inputs.routerpe}
                                                </MenuItem>
                                            </Select>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="tagpe" value={inputs.tagpe} id="outlined-basic" label="Phone Tag" variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="ownerpe" value={inputs.ownerpe} id="outlined-basic" label="Phone Owner"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="typepe" value={inputs.typepe} id="outlined-basic" label="Phone Type"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="linepe" value={inputs.linepe} id="outlined-basic" label="Line Number"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="idmacpe" value={inputs.idmacpe} id="outlined-basic" label="Phone Name"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="userdnpe" value={inputs.userdnpe} id="outlined-basic" label="Digist User"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="passdnpe" value={inputs.passdnpe} id="outlined-basic" label="Digist Password"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="codecpe" value={inputs.codecpe} id="outlined-basic" label="Voice Codec"
                                                   variant="outlined"
                                                   onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <TextField name="vcodecpe" value={inputs.vcodecpe} id="outlined-basic" label="Class Codec"
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