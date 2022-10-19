import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import DashCard from "../components/Card/DashCard";
import { Tables } from "../services/data-types/index";
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

async function getTables(): Promise<Tables[]> {
    const url = "http://localhost:8000/api/v1/table";
    const response = await axios.get(url);
    return response.data.data;
}

function DashboardContent() {
    const [tables, setTables] = useState<[] | Tables[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const tables = await getTables();
            setTables(tables);
        })();
    }, [navigate]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <SidebarAdmin title={"Dashboard"} />
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
                        {/* Tables */}
                        <Grid container spacing={2}>
                            {tables.map((key: Tables, i: number) => (
                                <Slide
                                    direction="up"
                                    in={true}
                                    timeout={{
                                        appear: 3000,
                                        enter: 2000,
                                        exit: 1000,
                                    }}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <Grid key={i} item xs={3}>
                                        <DashCard
                                            id={key.id}
                                            title={key.name}
                                            guest_number={key.guest_number}
                                            status={key.status}
                                        />
                                    </Grid>
                                </Slide>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboards() {
    return <DashboardContent />;
}
