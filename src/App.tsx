import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ display: "flex", mt: 7, width: "100%" }}>
        <Sidebar />
        <MainContent />
      </Box>
    </Box>
  );
};

export default App;
