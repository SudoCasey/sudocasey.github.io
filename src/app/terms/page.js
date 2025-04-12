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

export default function TermsOfService() {
    return (
        <Container maxWidth="lg">
            <AppTheme>
                <CssBaseline enableColorScheme />
                <Navbar />
                <NavbarSpacer />
                <Divider />
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Terms of Service
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Last updated: April 12, 2024
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Agreement to Terms
                    </Typography>
                    <Typography variant="body1" paragraph>
                        By accessing and using sudocasey.github.io (the "Site"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Use License
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Permission is granted to temporarily download one copy of the materials (information or software) on the Site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </Typography>
                    <ul>
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Disclaimer
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The materials on the Site are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Limitations
                    </Typography>
                    <Typography variant="body1" paragraph>
                        In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Revisions and Errata
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The materials appearing on the Site could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the Site are accurate, complete, or current. We may make changes to the materials contained on the Site at any time without notice.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Links
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We have not reviewed all of the sites linked to the Site and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Site Terms of Use Modifications
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may revise these terms of service for the Site at any time without notice. By using this Site you are agreeing to be bound by the then current version of these terms of service.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Governing Law
                    </Typography>
                    <Typography variant="body1" paragraph>
                        These terms and conditions are governed by and construed in accordance with the laws of Florida, United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions about these Terms of Service, please use the contact methods listed on our <Link component={NextLink} href="/contact">Contact page</Link>.
                    </Typography>
                </Box>
                <Divider />
                <Footer />
            </AppTheme>
        </Container>
    );
} 