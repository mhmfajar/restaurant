import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import BasicTableOrder from "../components/Table/BasicTableOrder";
import { Orders } from "../services/data-types/index";
import { getOrders } from "../services/order";
import { useNavigate } from "react-router";

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

function OrderContent() {
    const [orders, setOrders] = useState<[] | Orders[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const orders = await getOrders();
            setOrders(orders.data);
        })();
    }, [navigate]);

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
                        <BasicTableOrder data={orders} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Order() {
    return <OrderContent />;
}
