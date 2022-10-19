import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function BasicTable(props: any) {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row: any, i: number) => (
                        <TableRow
                            key={i}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">
                                {row.status === true ? "Ready" : "Not Ready"}
                            </TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                    onClick={() => navigate(`edit/${row.id}`)}
                                >
                                    <EditIcon />
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        props.handleDelete(row.id);
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
