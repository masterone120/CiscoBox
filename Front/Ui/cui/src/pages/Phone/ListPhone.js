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

export default function ListPhone() {
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        getPhones();
    }, []);

    function getPhones() {
        axios.get('http://localhost:5000/phonelist').then(function (response) {
            console.log(response.data);
            setPhones(response.data);
        });
    }

    const deletePhone = (id_phone) => {
        axios.delete(`http://localhost:5000/phonedelete/${id_phone}`).then(function (response) {
            console.log(response.data)
            getPhones();
        });
        alert("Phone Device Successfully Deleted!");
    }

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontsize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
    },
        '&:last-child td, &:last-child th': {
            border: 0,
    },
    }));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth:700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Phone Tag</StyledTableCell>
                        <StyledTableCell>Phone Type</StyledTableCell>
                        <StyledTableCell>Phone Name</StyledTableCell>
                        <StyledTableCell>Line Number</StyledTableCell>
                        <StyleTableCell>Phone Owner</StyleTableCell>
                        <StyledTableCell>Digist User</StyledTableCell>
                        <StyledTableCell>Digist Pass</StyledTableCell>
                        <StyledTableCell>Codec</StyledTableCell>
                        <StyledTableCell>Class Codec</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {phones.map((phone, key) => (
                        <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">{phone.tagpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.typepe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.idmacpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.linepe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.ownerpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.userpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.passpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.codecpe}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{phone.vcodec}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Link to={'/phone/${phone.id_phone}/edit'} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                <Button variant="contained" color="error" onClick={() => deletePhone(phone.id_phone)}>Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}