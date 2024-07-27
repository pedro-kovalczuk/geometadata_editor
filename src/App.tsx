import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Upload do produto");
  const [disabledItems, setDisabledItems] = useState<boolean[]>([false, true, true, true, true, true]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ display: "flex", mt: 7, width: "100%" }}>
        <Sidebar
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        disabledItems={disabledItems}
        setDisabledItems={setDisabledItems}
      />
        <MainContent />
      </Box>
    </Box>
  );
};

export default App;
