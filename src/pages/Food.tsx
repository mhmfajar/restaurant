import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import BasicTable from "../components/Table/BasicTable";
import { Foods } from "../services/data-types/index";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { fetchFood, setFoodDelete } from "../services/food";

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

function FoodContent() {
    const [foods, setFoods] = useState<[] | Foods[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const foods = await fetchFood();
            setFoods(foods.data);
        })();
    }, [navigate]);

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm("Anda Yakin Data Dihapus?");

        if (!isConfirm) {
            return;
        }

        await setFoodDelete(id);
        const foods = await fetchFood();
        setFoods(foods.data);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <SidebarAdmin title={"Foods"} />
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
                    <Fade
                        in={true}
                        timeout={{ appear: 5000, enter: 3000, exit: 2000 }}
                    >
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            {/* Foods */}
                            <Button
                                onClick={() => navigate("create")}
                                size="small"
                                variant="contained"
                                color="primary"
                                sx={{ mb: 2 }}
                            >
                                Create Food
                            </Button>
                            <BasicTable
                                data={foods}
                                handleDelete={handleDelete}
                            />
                        </Container>
                    </Fade>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Food() {
    return <FoodContent />;
}
