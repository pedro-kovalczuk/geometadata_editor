import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PanToolAlt from "@mui/icons-material/PanToolAlt";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useRef, useState } from "react";
import { MetadataTypeForm, UploadJSON } from "../interfaces/app_interfaces";

import product_data from "../assets/product_type_form-response.json";
import upload_data from "../assets/upload_response_example.json";

interface ProductUploadProps {
  setDisabledItems: (items: boolean[]) => void;
  setProductName: (items: string) => void;
  isLoadedProduct: boolean;
  setLoadedProduct: (items: boolean) => void;
  metadata: MetadataTypeForm | null;
  setMetadata: React.Dispatch<React.SetStateAction<MetadataTypeForm | null>>;
  setSelectedItem: (item: string) => void;
}

const ProductUpload: React.FC<ProductUploadProps> = ({
  setDisabledItems,
  setProductName,
  isLoadedProduct,
  setLoadedProduct,
  metadata,
  setMetadata,
  setSelectedItem,
}) => {
  const [productID, setProductID] = useState<number | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  // Use a ref to programmatically click the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Set loading state to true while processing the file
      setLoading(true);

      // Simulate file loading delay or large file processing
      try {
        // Here you can add any asynchronous logic for processing the file
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay (2 seconds)
        setSelectedFile(file);
        const productName = file.name;
        setProductName(productName);
        setLoadedProduct(true);
      } catch (error) {
        console.error("File processing error: ", error);
      } finally {
        // Turn off the loading state once the file is processed
        setLoading(false);
      }
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

          {isLoadedProduct && (
            <Box sx={{ mt: 4, width: 500, mb: 6 }}>
              <Typography
                style={{ marginBottom: 5, marginLeft: 5, fontFamily: "Nunito" }}
              >
                Selecione o tipo do produto carregado acima (Obrigatório)
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
