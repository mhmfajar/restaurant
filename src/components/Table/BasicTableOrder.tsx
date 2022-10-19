import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
                        <TableCell align="center">Order Number</TableCell>
                        <TableCell align="center">Meja</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Total Food</TableCell>
                        <TableCell align="center">Total Price</TableCell>
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
                                {row.order_number}
                            </TableCell>
                            <TableCell align="center">{row.table}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                                {row.total_food}
                            </TableCell>
                            <TableCell align="center">
                                {row.total_price}
                            </TableCell>
                            <TableCell align="center">
                                {row.status === "closed" ? (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`${row.id}`)}
                                    >
                                        <VisibilityIcon />
                                    </Button>
                                ) : (
                                    ""
                                )}
                                {row.status === "open" ? (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="warning"
                                        onClick={() =>
                                            navigate(`${row.id}/edit`)
                                        }
                                    >
                                        <EditIcon />
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
