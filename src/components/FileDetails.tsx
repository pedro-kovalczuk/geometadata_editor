import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Box, Button, Typography } from "@mui/material";
import { UploadResponse } from "../types/apiTypes";

const FileDetails: React.FC<{
  fileName: string;
  fileSize: string;
  onSubmit: () => void;
  uploadResponse: UploadResponse | null;
  onDelete: () => void;
}> = ({ fileName, fileSize, onSubmit, uploadResponse, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 2,
        borderRadius: 1,
        mt: 2,
        width: "80%",
        boxShadow: 1,
        marginTop: 5,
      }}
    >
      <FileCopyIcon fontSize="medium" sx={{ color: "#4caf50", mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontFamily: "Nunito" }}>{fileName}</Typography>
        <Typography sx={{ fontFamily: "Nunito", fontSize: 12, color: "gray" }}>
          {fileSize}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDelete}
        sx={{ fontFamily: "Nunito", fontWeight: "bold", mr: 3 }}
      >
        Excluir
      </Button>

      {!uploadResponse ? (
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          sx={{ fontFamily: "Nunito", fontWeight: "bold" }}
        >
          Enviar
        </Button>
      ) : (
        <>
          <CheckCircleIcon fontSize="medium" sx={{ color: "#4caf50", mr: 1 }} />
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: 14,
              fontWeight: "bold",
              color: "green",
              mr: 1,
            }}
          >
            Validado
          </Typography>
        </>
      )}
    </Box>
  );
};

export default FileDetails;
