import React, {useEffect, useEstate} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default function ListDevicePage() {
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        getDevices();
    }, []);
    
}