import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

const MainContent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, mt: 8 }}>
      <Button variant="contained" color="success" sx={{ marginRight: 2 }}>
        + Adicionar novo
      </Button>
      <Button variant="contained" color="success">
        Selecionar produto
      </Button>
    </Box>
  );
};

export default MainContent;
