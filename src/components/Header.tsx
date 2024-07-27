import React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "../styles/Header.module.css"; // Import the CSS module

const Header: React.FC = () => {
  return (
    <AppBar color="transparent" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.titleContainer}>
          <Typography variant="h4" component="div"  className={styles.title} >
            GEOMETADATA
          </Typography>
          <Typography variant="h6" component="div" className={styles.subtitle}>
             Creator
          </Typography>
        </Box>
        <Box className={styles.avatarContainer}>
          <Avatar className={styles.avatar} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
