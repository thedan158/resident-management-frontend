import React from "react";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function PageLoader() {
    const loading = useSelector(state => state.app.loading);

    return (
        <Grid container >
            {
                loading ? (
                    <Box
                        sx={{
                            position: "fixed",
                            height: "100%",
                            width: "100%",
                            opacity: ".5",
                            top: "0",
                            left: "0",
                            background: "#141526",
                            zIndex: "9999",
                            fontSize: "65px",
                            textAlign: "center",
                            paddingTop: "200px",
                            color: "#fff",

                        }}
                    >
                        <CircularProgress
                            size={100}
                        />
                    </Box>
                ) : null
            }

        </Grid>
    )
}