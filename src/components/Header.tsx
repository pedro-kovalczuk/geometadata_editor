import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" color="default" sx={{ height: 60 }}>
      <Toolbar sx={{ minHeight: 60 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CARTOLOG
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" component="div">
            Gerenciamento de metadados para produtos cartográficos
          </Typography>
          <Avatar sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
