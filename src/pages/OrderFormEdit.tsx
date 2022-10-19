import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { fetchFood, getOrderFood } from "../services/food";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FoodCard from "../components/Card/FoodCard";
import Button from "@mui/material/Button";
import { Foods } from "../services/data-types";
import {
    getOrderDetail,
    setAddOrderDetails,
    setCloseOrder,
    setDeleteOrderDetails,
    setUpdateOrderDetails,
} from "../services/order";
import { currencyFormat } from "../helpers/helpers";

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
    const [foods, setFoods] = useState<[] | Foods[]>([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const foods = await getOrderFood();
            setFoods(foods.data);
            const order = await getOrderDetail(id);
            setOrderDetails(order.data.details);
        })();
    }, [navigate, id]);

    const handlerAddFood = async (idFood: string) => {
        const data = {
            id,
            idFood,
        };
        await setAddOrderDetails(data);

        const order = await getOrderDetail(id);
        setOrderDetails(order.data.details);
    };

    const handlerAddQty = async (qty: string, idOrderDetail: string) => {
        const data = {
            qty,
            idOrderDetail,
        };
        await setUpdateOrderDetails(data);

        const order = await getOrderDetail(id);
        setOrderDetails(order.data.details);
    };

    const handlerDeleteFood = async (idOrderDetail: string) => {
        await setDeleteOrderDetails(idOrderDetail);

        const order = await getOrderDetail(id);
        setOrderDetails(order.data.details);
    };

    const handlerCloseOrder = async () => {
        await setCloseOrder(id);
        navigate("/orders");
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
                                    {foods.map((row: any) => (
                                        <FoodCard
                                            key={row.name}
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
                                    }}
                                >
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">
                                                        #
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Menu
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Total Price
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Total
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderDetails
                                                    ? orderDetails.map(
                                                          (
                                                              row: any,
                                                              i: number
                                                          ) => (
                                                              <TableRow
                                                                  key={i}
                                                                  sx={{
                                                                      "&:last-child td, &:last-child th":
                                                                          {
                                                                              border: 0,
                                                                          },
                                                                  }}
                                                              >
                                                                  <TableCell
                                                                      component="th"
                                                                      align="center"
                                                                  >
                                                                      {i + 1}
                                                                  </TableCell>
                                                                  <TableCell align="center">
                                                                      {row.menu}
                                                                  </TableCell>
                                                                  <TableCell align="center">
                                                                      {currencyFormat(
                                                                          row.total_price
                                                                      )}
                                                                  </TableCell>
                                                                  <TableCell align="center">
                                                                      <TextField
                                                                          sx={{
                                                                              width: 60,
                                                                          }}
                                                                          id="outlined-basic"
                                                                          variant="outlined"
                                                                          type="number"
                                                                          defaultValue={
                                                                              row.jumlah
                                                                          }
                                                                          onChange={(
                                                                              event
                                                                          ) =>
                                                                              handlerAddQty(
                                                                                  event
                                                                                      .target
                                                                                      .value,
                                                                                  row.idOrderDetail
                                                                              )
                                                                          }
                                                                          size="small"
                                                                      />
                                                                  </TableCell>
                                                                  <TableCell align="center">
                                                                      <IconButton
                                                                          color="error"
                                                                          aria-label="delete"
                                                                          onClick={() =>
                                                                              handlerDeleteFood(
                                                                                  row.idOrderDetail
                                                                              )
                                                                          }
                                                                      >
                                                                          <ClearIcon />
                                                                      </IconButton>
                                                                  </TableCell>
                                                              </TableRow>
                                                          )
                                                      )
                                                    : []}
                                            </TableBody>
                                        </Table>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={() => handlerCloseOrder()}
                                        >
                                            Close Order
                                        </Button>
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
