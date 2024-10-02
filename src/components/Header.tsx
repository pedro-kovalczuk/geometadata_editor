import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "../styles/Header.module.css"; // Import the CSS module

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  // Toggle dark mode state
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar color="transparent" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.titleContainer}>
          <Typography
            variant="h4"
            component="div"
            className={styles.title}
            sx={{ fontFamily: "Nunito" }}
          >
            GEOMETADATA
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={styles.subtitle}
            sx={{ fontFamily: "Nunito", marginLeft: 1 }}
          >
            Creator
          </Typography>
        </Box>

        <Box className={styles.avatarContainer}>
          {/* Dark mode toggle button */}
          <IconButton
            edge="end"
            aria-label="dark mode toggle"
            onClick={handleToggleDarkMode}
            className={styles.darkModeButton}
            sx={{
              mr: 3,
              color: darkMode ? "white" : "inherit", // Change color to white when darkMode is true
              "& .MuiSvgIcon-root": {
                fontSize: 30, // Adjust icon size here
              },
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Profile avatar */}
          <Avatar className={styles.avatar} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
