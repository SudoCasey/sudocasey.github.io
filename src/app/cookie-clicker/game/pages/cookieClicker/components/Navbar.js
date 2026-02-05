import React, { useState, useEffect } from "react";
import styles from '@/styles/Navbar.module.scss';
import Dialog from '@mui/material/Dialog';
import Menu from './Menu.js';
//import Image from 'next/image';



    
export default function Navbar(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    return (
        <nav className={`${styles.navbar}`}>
            <h1>Cookie Clicker</h1>
            <button onClick={handleClickOpen}>Menu</button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Menu />
            </Dialog>
        </nav>
    );
}