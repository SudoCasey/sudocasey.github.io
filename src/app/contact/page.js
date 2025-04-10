'use client';
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../components/Navbar";
import Divider from "@mui/material/Divider";
import Footer from "../../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import NavbarSpacer from "../../components/NavbarSpacer";
import Contact from "../../components/Contact";

export default function ContactPage() {
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
                    <Contact />
                </Box>
                <Divider />
                <Footer />
            </AppTheme>
        </Container>
    );
} 