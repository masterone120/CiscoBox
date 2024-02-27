import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {StyledEngineProvider} from "@mui/material";

export default function Deploy() {
    const [deploys, setDeploys] = useState([]);
    useEffect(() => {
        getDeploys();
    }, []);

    function getDeploys() {
        axios.get('http://localhost:5000/view').then(function(response) {
            console.log(response.data);
            setDeploys(response.data);
        });
    }

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/deploy', inputs).then(function (response) {
            console.log(response.data);
            navigate('/phonelist');
        });
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontsize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth:700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Device Name</StyledTableCell>
                        <StyledTableCell>Device IP Address</StyledTableCell>
                        <StyledTableCell>Directory Number</StyledTableCell>
                        <StyledTableCell>Phone Name</StyledTableCell>
                        <StyledTableCell>Phone Type</StyledTableCell>
                        <StyledTableCell>Phone Owner</StyledTableCell>
                        <StyledTableCell>Line Number</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(deploys.map((deploy, key) => (
                        <StyledTableRow key={key}>
                            <StyledTableCell  component="th" scope="row">{deploy.namede}</StyledTableCell>
                            <StyledTableCell   component="th" scope="row">{deploy.ipaddrde}</StyledTableCell>
                            <StyledTableCell  component="th" scope="row">{deploy.numberdn}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{deploy.idmacpe}</StyledTableCell>
                            <StyledTableCell  component="th" scope="row">{deploy.typepe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{deploy.ownerpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{deploy.linepe}</StyledTableCell>
                        </StyledTableRow>

                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}