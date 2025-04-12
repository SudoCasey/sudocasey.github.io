'use client';
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../components/Navbar";
import Divider from "@mui/material/Divider";
import Footer from "../../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import NavbarSpacer from "../../components/NavbarSpacer";
import Link from "@mui/material/Link";
import NextLink from "next/link";

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="lg">
            <AppTheme>
                <CssBaseline enableColorScheme />
                <Navbar />
                <NavbarSpacer />
                <Divider />
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Last updated: April 12, 2024
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Introduction
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact with sudocasey.github.io (the "Site").
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        How We Use Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use the information that we collect to:
                    </Typography>
                    <ul>
                        <li>Communicate with you</li>
                        <li>Screen for potential risk and fraud</li>
                        <li>Improve and optimize our Site</li>
                        <li>Monitor and analyze usage patterns</li>
                    </ul>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Sharing Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact methods listed on our <Link component={NextLink} href="/contact">Contact page</Link>.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Changes
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please use the contact methods listed on our <Link component={NextLink} href="/contact">Contact page</Link>.
                    </Typography>
                </Box>
                <Divider />
                <Footer />
            </AppTheme>
        </Container>
    );
} 