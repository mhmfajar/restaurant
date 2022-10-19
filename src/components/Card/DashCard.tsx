import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { setOrderTable } from "../../services/order";

export default function DashCard(props: any) {
    const navigate = useNavigate();

    const handleOrderTable = async (id: any) => {
        const response = await setOrderTable(id);

        if (response.error) {
            console.log(response.data);
        } else {
            navigate(`/orders/${id}/edit`);
        }
    };

    return (
        <Card
            onClick={() => handleOrderTable(props.id)}
            sx={{
                maxWidth: 345,
                backgroundColor:
                    props.status === "available" ? "#6fbf73" : "#ffac33",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                    <sup> ({props.guest_number})</sup>
                </Typography>
                <span className={styles.smallBoxFooter}>
                    {props.status === "available"
                        ? props.status === "ordered"
                            ? "Meja Sedang Digunakan"
                            : "Meja Kosong"
                        : "Meja Sedang Digunakan"}
                </span>
            </CardContent>
        </Card>
    );
}
