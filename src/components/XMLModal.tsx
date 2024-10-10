import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { APIResponse } from "../types/apiTypes";

interface XmlModalProps {
  open: boolean;
  onClose: () => void;
  response: APIResponse | null;
}

const XmlModal: React.FC<XmlModalProps> = ({ open, onClose, response }) => {
  const metadataFile = response?.data?.metadata_file || [];

  const handleDownloadXml = () => {
    const xmlString = metadataFile.join("\n");
    const blob = new Blob([xmlString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "metadata.xml";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>XML de Metadados</DialogTitle>
      <DialogContent dividers>
        <Typography component="pre" style={{ whiteSpace: "pre-wrap" }}>
          {metadataFile.join("")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Fechar
        </Button>
        <Button onClick={handleDownloadXml} color="primary" variant="contained">
          Download XML
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default XmlModal;
