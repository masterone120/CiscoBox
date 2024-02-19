import React, { useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function ListDevicePage() {
    conts [devices, setDevices] = useState([]);
    useEffect(() => {
        getDevices();
    },[]);
}