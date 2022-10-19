import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import SpanningTable from "../components/Table/SpanningTable";
import { getOrderDetail } from "../services/order";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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

function OrderDetailContent() {
    const [orderNumber, setOrderNumber] = useState("");
    const [total, setTotal] = useState("");
    const [details, setDetails] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const orders = await getOrderDetail(id);
            setOrderNumber(orders.data.order_number);
            setDetails(orders.data.details);
            setTotal(orders.data.total);
        })();
    }, [navigate, id]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <SidebarAdmin title={"Orders"} />
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
                        {/* Orders */}
                        <Button
                            variant="contained"
                            sx={{ mb: 3 }}
                            onClick={() => navigate(-1)}
                            startIcon={<ArrowBackIosNewIcon />}
                        >
                            Back
                        </Button>
                        <SpanningTable
                            orderNumber={orderNumber}
                            details={details}
                            total={total}
                        />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function OrderDetail() {
    return <OrderDetailContent />;
}
