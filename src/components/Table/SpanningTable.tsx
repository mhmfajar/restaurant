import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SpanningTable({ orderNumber, details, total }: any) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Order Number #{orderNumber}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Menu</TableCell>
                        <TableCell align="right">Jumlah</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {details
                        ? details.map((row: any, i: number) => (
                              <TableRow key={i}>
                                  <TableCell>{i + 1}</TableCell>
                                  <TableCell align="right">
                                      {row.menu}
                                  </TableCell>
                                  <TableCell align="right">
                                      {row.jumlah}
                                  </TableCell>
                                  <TableCell align="right">
                                      {row.total_price}
                                  </TableCell>
                              </TableRow>
                          ))
                        : " "}
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Total
                        </TableCell>
                        <TableCell align="right">{total}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
