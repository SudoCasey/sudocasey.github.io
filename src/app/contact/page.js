'use client';
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import NavbarSpacer from "../../components/NavbarSpacer";
import Contact from "../../components/Contact";
import PageWrapper from "../../components/PageWrapper";

export default function ContactPage() {
    return (
        <Container maxWidth="lg">
            <AppTheme>
                <PageWrapper>
                    <CssBaseline enableColorScheme />
                    <Navbar />
                    <NavbarSpacer />
                    <Box
                        sx={{
                            pt: { xs: 15, sm: 5 },
                            pb: { xs: 0, sm: 0 },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Contact />
                    </Box>
                    <Footer />
                </PageWrapper>
            </AppTheme>
        </Container>
    );
} 