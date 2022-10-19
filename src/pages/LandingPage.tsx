import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { Tables } from "../services/data-types/index";

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

function LandingPageContent() {
    const [tables, setTables] = useState<[] | Tables[]>([]);

    useEffect(() => {
        (async () => {
            const tables = await getTables();
            setTables(tables);
        })();
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Sidebar title={"Main"} />
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
                            {tables.map((key: Tables) => (
                                <Grid key={key.id} item xs={3}>
                                    <Card
                                        title={key.name}
                                        guest_number={key.guest_number}
                                        status={key.status}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function LandingPage() {
    return <LandingPageContent />;
}
