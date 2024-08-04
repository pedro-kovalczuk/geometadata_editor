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
    <Box sx={{ display: "grid", gridTemplateAreas: `"header header" "sidebar main"`, gridTemplateColumns: "auto 1fr", gridTemplateRows: "auto 1fr", height: "100vh"}}>
      <CssBaseline />
      <Box sx={{ gridArea: "header" }}>
        <Header />
      </Box>
      <Box sx={{ gridArea: "sidebar"}}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          disabledItems={disabledItems}
          setDisabledItems={setDisabledItems}
        />
      </Box>
      <Box sx={{ gridArea: "main" }}>
        <MainContent
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setDisabledItems={setDisabledItems}
        />
      </Box>
    </Box>
  );
};

export default App;
