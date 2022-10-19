import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function FoodCard(props: any) {
    function currencyFormat(num: number) {
        return (
            "Rp. " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        );
    }

    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor: "#6fbf73",
                color: "white",
                display: "flex",
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography gutterBottom variant="h4" component="div">
                        {props.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {currencyFormat(props.price)}
                    </Typography>
                </CardContent>
            </Box>
            <Button
                color="info"
                variant="contained"
                sx={{ margin: 1, marginLeft: "auto" }}
                onClick={() => props.handlerAddFood()}
            >
                <AddIcon />
            </Button>
        </Card>
    );
}
