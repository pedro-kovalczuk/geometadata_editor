import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PanToolAlt from "@mui/icons-material/PanToolAlt";

const MainContent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4, mt: 3 }}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{ marginRight: 2 }}
      >
        Adicionar novo
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<PanToolAlt />}
      >
        Selecionar produto
      </Button>
    </Box>
  );
};

export default MainContent;
