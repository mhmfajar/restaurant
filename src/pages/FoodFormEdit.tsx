import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getFoodDetail, setFoodUpdate } from "../services/food";
import Checkbox from "@mui/material/Checkbox";

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

function FoodFormCreateContent() {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [status, setStatus] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        }

        (async () => {
            const foodDetail = await getFoodDetail(id);
            const { name, price, status, type } = foodDetail.data;
            setName(name);
            setType(type);
            setPrice(price);
            setStatus(status);
        })();
    }, [navigate, id]);

    const handleSubmit = async () => {
        const data = {
            name,
            type,
            price,
            status,
        };

        const response = await setFoodUpdate(data, id);

        if (response.error) {
            console.log(response.data);
        } else {
            navigate("/foods");
        }
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
                        {/* Foods */}
                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Type"
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                >
                                    <MenuItem value={"Makanan"}>
                                        Makanan
                                    </MenuItem>
                                    <MenuItem value={"Minuman"}>
                                        Minuman
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                type="number"
                                name="price"
                                autoComplete="price"
                                autoFocus
                                value={price}
                                onChange={(event) =>
                                    setPrice(event.target.value)
                                }
                            />
                            <FormGroup>
                                <InputLabel id="demo-simple-select-label">
                                    Status
                                </InputLabel>
                                <FormControlLabel
                                    checked={status}
                                    control={<Checkbox />}
                                    label="Ready"
                                    value={status}
                                    onChange={() => setStatus(!status)}
                                />
                            </FormGroup>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function FoodFormCreate() {
    return <FoodFormCreateContent />;
}
