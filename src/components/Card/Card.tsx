import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Card.module.css";

export default function MCard(props: any) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor:
                    props.status === "available" ? "#6fbf73" : "#ffac33",
                color: "white",
                textAlign: "center",
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
