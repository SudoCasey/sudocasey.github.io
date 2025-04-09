'use client';
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import ProTip from "@/components/ProTip";
import Copyright from "@/components/Copyright";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../components/Navbar";
import Divider from "@mui/material/Divider";
import Footer from "../../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import NavbarSpacer from "../../components/NavbarSpacer";

export default function About() {
    return (
        <Container maxWidth="lg">
            <AppTheme>
                <CssBaseline enableColorScheme />
                <Navbar />
                <NavbarSpacer />
                <Divider />
                <Box
                    sx={{
                        my: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                        Casey Friedrich
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                        The{" "}
                        <Typography
                            component="span"
                            variant="h4"
                            sx={(theme) => ({
                                fontSize: "inherit",
                                color: "primary.main",
                                ...theme.applyStyles("dark", {
                                    color: "primary.light",
                                }),
                            })}
                        >
                            Man
                        </Typography>
                        , The{" "}
                        <Typography
                            component="span"
                            variant="h4"
                            sx={(theme) => ({
                                fontSize: "inherit",
                                color: "primary.main",
                                ...theme.applyStyles("dark", {
                                    color: "primary.light",
                                }),
                            })}
                        >
                            Myth
                        </Typography>
                        , The{" "}
                        <Typography
                            component="span"
                            variant="h4"
                            sx={(theme) => ({
                                fontSize: "inherit",
                                color: "primary.main",
                                ...theme.applyStyles("dark", {
                                    color: "primary.light",
                                }),
                            })}
                        >
                            Legend
                        </Typography>
                    </Typography>
                </Box>
                <Divider />
                <Footer />
            </AppTheme>
        </Container>
    );
}
