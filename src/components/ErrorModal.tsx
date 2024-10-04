import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

// Exemplo de dados que precisam ser corrigidos
const camposErrados = {
  "MD_DataIdentification-spatialRepresentationType": "Matricial",
  "MD_ReferenceSystem-referenceSystemIdentifier-code": 5531,
  "MD_DataIdentification-spatialResolution-equivalentScale-denominator1": 10000,
  "MD_DataIdentification-spatialResolution-equivalentScale-denominator2": 10000,
  "MD_Identification-citation-alternateTitle": "1863-4-SO-C",
};

interface ErrorModalProps {
  open: boolean;
  handleClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Campos a serem corrigidos:
        </Typography>
        <Box sx={{ mb: 2 }}>
          {Object.entries(camposErrados).map(([campo, valor]) => (
            <Typography key={campo} sx={{ mb: 1 }}>
              <strong>{campo}:</strong> {valor}
            </Typography>
          ))}
        </Box>
        <Button variant="contained" color="success" onClick={handleClose}>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
