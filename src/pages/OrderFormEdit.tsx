import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { fetchFood } from "../services/food";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FoodCard from "../components/Card/FoodCard";
import { Foods } from "../services/data-types";
import { getOrderDetail } from "../services/order";

const mdTheme = createTheme({
    palette: {
        primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
});

function OrderFormEditContent() {
    // const [name, setName] = React.useState("");
    // const [type, setType] = React.useState("");
    // const [price, setPrice] = React.useState("");
    // const [status, setStatus] = React.useState(false);
    const [foods, setFoods] = useState<[] | Foods[]>([]);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    // const [addFood, setAddFood] = React.useState("");

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const foods = await fetchFood();
            setFoods(foods.data);
            const order = await getOrderDetail(id);
            setOrder(order.data);
        })();
    }, [navigate, id]);

    const handlerAddFood = async () => {
        const order = await getOrderDetail(id);
        setOrder(order.data);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <SidebarAdmin title={"Edit Food"} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={2}>
                            {/* Chart */}
                            <Grid item xs={4} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {foods.map((row: any, i: number) => (
                                        <FoodCard
                                            key={i}
                                            id={row.id}
                                            name={row.name}
                                            price={row.price}
                                            handlerAddFood={handlerAddFood}
                                        />
                                    ))}
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={8} md={8} lg={8}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                >
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="right">
                                                        Menu
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        Total Price
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        Jumlah
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{
                                                            "&:last-child td, &:last-child th":
                                                                { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.calories}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.fat}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.carbs}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.protein}
                                                        </TableCell>
                                                    </TableRow>
                                                ))} */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function OrderFormEdit() {
    return <OrderFormEditContent />;
}
