import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { APIResponse } from "../types/apiTypes";

interface ErrorModalProps {
  open: boolean;
  handleClose: () => void;
  xmlUploadResponse: APIResponse | null;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  handleClose,
  xmlUploadResponse,
}) => {
  const missingFields = xmlUploadResponse?.data.missing_fields || [];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          XML diagnosticado com sucesso
        </Typography>
        {missingFields.length > 0 && (
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Campos faltantes:
            </Typography>
            <Box
              sx={{
                maxHeight: missingFields.length > 6 ? 200 : "auto", // Set height if more than 6 fields
                overflowY: missingFields.length > 6 ? "auto" : "visible",
                border: "1px solid #ddd",
                borderRadius: 1,
                p: 1,
              }}
            >
              <ol>
                {missingFields.map((field: string, index: number) => (
                  <li key={index}>
                    <Typography>{field}</Typography>
                  </li>
                ))}
              </ol>
            </Box>
          </Box>
        )}
        <Button
          variant="contained"
          color="success"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
