import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';



export default function ListDirectory() {
    const [directorys, setDirectorys] = useState([]);
    useEffect(() => {
        getDirectorys();
    },[]);
    function getDirectorys() {
        axios.get('http://localhost:5000/directorylist').then(function(response) {
            console.log(response.data);
            setDirectorys(response.data);
        });
    }

    const deleteDirectory = (id_numplan) => {
        axios.delete(`http://localhost:5000/directorydelete/${id_numplan}`).then(function (response) {
            console.log(response.data);
            getDirectorys();
        });
        alert("Directory Number Successfully Deleted!");
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
                        <StyledTableCell>Directory Tag</StyledTableCell>
                        <StyledTableCell>Directory Number</StyledTableCell>
                        <StyledTableCell>User Owner</StyledTableCell>
                        <StyledTableCell>Desciption</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {directorys.map((directory, key) => (
                        <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">{directory.tagdn}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{directory.numberdn}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{directory.namedn}</StyledTableCell>
                            <StyledTableCell componetn="th" scope="row">{directory.desdn}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/directory/${directory.id_numplan}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                <Button variant="contained" color="error" onClick={ () => deleteDirectory(directory.id_numplan) }>Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


