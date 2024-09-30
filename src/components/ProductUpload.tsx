import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PanToolAlt from "@mui/icons-material/PanToolAlt";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useRef, useState } from "react";
import { MetadataTypeForm, ProductType, UploadJSON } from "../types/appTypes";

import { uploadProduct } from "../config/axios";

import axios from "axios";
import { toast } from "react-toastify";
import product_data from "../assets/product_type_form-response.json";
import upload_data from "../assets/upload_response_example.json";
import { Response } from "../types/apiTypes";

// Function to format the file size
const formatFileSize = (sizeInBytes: number) => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (sizeInBytes >= gb) {
    return `${(sizeInBytes / gb).toFixed(2)} GB`;
  } else if (sizeInBytes >= mb) {
    return `${(sizeInBytes / mb).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / kb).toFixed(2)} KB`;
  }
};

// Define the FileDetails component
const FileDetails: React.FC<{
  fileName: string;
  fileSize: string;
  onSubmit: () => void;
  uploadResponse: Response | null; // Add isLoadedProduct prop
  onDelete: () => void; // Add onDelete function prop
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
        marginTop: 4,
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

      {/* Conditionally render the "Enviar" button if isLoadedProduct is false */}
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
          {/* Show "Validado" with check icon if the product is loaded */}
          <CheckCircleIcon fontSize="medium" sx={{ color: "#4caf50", mr: 1 }} />
          <Typography
            sx={{
              fontFamily: "Nunito",
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

interface ProductUploadProps {
  setDisabledItems: (items: boolean[]) => void;
  productName: string;
  setProductName: (items: string) => void;
  isLoadedProduct: boolean;
  setLoadedProduct: (items: boolean) => void;
  metadata: MetadataTypeForm | null;
  setMetadata: React.Dispatch<React.SetStateAction<MetadataTypeForm | null>>;
  setSelectedItem: (item: string) => void;
  selectedFile: File | null; // Received from parent
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>; // Setter from parent
  fileSize: string; // Received from parent
  setFileSize: React.Dispatch<React.SetStateAction<string>>; // Setter from parent
  uploadResponse: Response | null;
  setUploadResponse: React.Dispatch<React.SetStateAction<Response | null>>;
  availableFormTypes: ProductType | null;
  setAvailableFormTypes: React.Dispatch<
    React.SetStateAction<ProductType | null>
  >;
}

const ProductUpload: React.FC<ProductUploadProps> = ({
  setDisabledItems,
  productName,
  setProductName,
  isLoadedProduct,
  setLoadedProduct,
  metadata,
  setMetadata,
  setSelectedItem,
  selectedFile,
  setSelectedFile,
  fileSize,
  setFileSize,
  uploadResponse,
  setUploadResponse,
  availableFormTypes,
  setAvailableFormTypes,
}) => {
  const [productID, setProductID] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  // Use a ref to programmatically click the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Reset state for a fresh upload process
      setUploadResponse(null);
      setLoadedProduct(false);

      // Set loading state to true while processing the file
      setLoading(true);

      try {
        // Process the file
        setSelectedFile(file);
        const selectedProductName = file.name;
        const fileSizeFormatted = formatFileSize(file.size);
        setFileSize(fileSizeFormatted); // Set fileSize for the FileDetails component
        setProductName(selectedProductName);
      } catch (error) {
        console.error("File processing error: ", error);
      } finally {
        // Turn off the loading state once the file is processed
        setLoading(false);
      }

      // Reset the input value so the same file can be selected again
      event.target.value = "";
    }
  };

  // Trigger the file input click programmatically when clicking the "Adicionar novo" button
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open the file explorer
    }
  };

  const updateMetadataFields = (
    metadata: MetadataTypeForm,
    jsonData: UploadJSON
  ): MetadataTypeForm => {
    const updatedFields = metadata.metadata_fields.map((field) => {
      const jsonValue = jsonData.metadata[field.iso_xml_path];
      if (jsonValue !== undefined) {
        return { ...field, default_value: jsonValue.toString().trim() };
      }
      return field;
    });
    return { ...metadata, metadata_fields: updatedFields };
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedID = event.target.value as number; // Ensure selectedID is a number
    setProductID(selectedID);
    const selectedMetadata =
      product_data.find((item) => item.id === selectedID) || null;
    if (selectedMetadata) {
      const updatedMetadata = updateMetadataFields(
        selectedMetadata,
        upload_data
      );
      setMetadata(updatedMetadata);
      setDisabledItems([false, false, false, false, false, false]);
      console.log(updatedMetadata);
    }
  };

  // Submit handler function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await uploadProduct(selectedFile);
      console.log("File submitted successfully:", selectedFile);
      setUploadResponse(response);
      setLoadedProduct(true);
      toast.success("Arquivo validado com sucesso!", {
        autoClose: 2000,
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          console.error("Network error: Unable to reach the server");
          toast.error(
            "Erro de rede: Por favor, confira sua rede ou tente novamente mais tarde",
            {
              autoClose: 4000, // 3 seconds
            }
          );
        } else {
          console.error("An error occurred:", error.message);
          toast.error("Este arquivo não é válido", {
            autoClose: 2000, // 3 seconds
          });
        }
      } else {
        toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.", {
          autoClose: 4000, // 3 seconds
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      {/* Hidden file input field */}
      <input
        type="file"
        accept="*" // Accept any type of file
        style={{ display: "none" }} // Hide the file input
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Show loading spinner while file is being processed */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{ marginRight: 2, fontFamily: "Nunito", fontWeight: "bold" }}
            onClick={handleUploadClick} // Trigger the file selection when clicked
            disabled={loading} // Disable button during loading
          >
            Adicionar novo
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<PanToolAlt />}
            sx={{ fontFamily: "Nunito", fontWeight: "bold" }}
            disabled={loading} // Disable button during loading
          >
            Selecionar produto
          </Button>

          {/* Render FileDetails component only if a file is selected */}
          {selectedFile && (
            <FileDetails
              fileName={productName}
              fileSize={fileSize} // Pass the file size prop
              onSubmit={handleSubmit}
              uploadResponse={uploadResponse} // Pass isLoadedProduct prop
              onDelete={() => {
                // Add delete logic here, e.g., resetting the file input
                setSelectedFile(null);
                setProductName("");
                setFileSize("");
                setLoadedProduct(false);
                setUploadResponse(null);
              }} // Add delete logic here
            />
          )}

          {isLoadedProduct && (
            <Box sx={{ mt: 4, width: 600, mb: 6 }}>
              <Typography
                style={{ marginBottom: 5, marginLeft: 5, fontFamily: "Nunito" }}
              >
                Selecione o tipo de formulário para o produto carregado acima
                (Obrigatório)
              </Typography>
              <Select
                value={productID}
                onChange={handleChange}
                displayEmpty
                fullWidth
                sx={{ fontFamily: "Nunito" }}
                disabled={loading} // Disable dropdown during loading
              >
                <MenuItem value="" disabled>
                  Tipos disponíveis
                </MenuItem>
                {product_data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {metadata && (
            <Button
              sx={{
                justifyContent: "flex-end",
                marginLeft: 34,
                fontWeight: "bold",
                fontFamily: "Nunito",
              }}
              variant="text"
              color="success"
              endIcon={<ArrowForwardIcon />}
              onClick={() => setSelectedItem("Editar Metadados")}
              disabled={loading} // Disable button during loading
            >
              Preencher Metadados
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductUpload;
