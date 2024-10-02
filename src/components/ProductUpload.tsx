import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { getFormType, postGeoproduct } from "../config/axios";
import { ProductType, UploadResponse } from "../types/apiTypes";
import { MetadataTypeForm } from "../types/appTypes";
import { formatFileSize } from "../utils/formatFileSize";
import FileDetails from "./FileDetails";

interface ProductUploadProps {
  setDisabledItems: (items: boolean[]) => void;
  productName: string;
  setProductName: (name: string) => void;
  isLoadedProduct: boolean;
  setLoadedProduct: (loaded: boolean) => void;
  metadata: MetadataTypeForm | null;
  setMetadata: React.Dispatch<React.SetStateAction<MetadataTypeForm | null>>;
  setSelectedItem: (item: string) => void;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedFormID: number | "";
  setSelectedFormID: React.Dispatch<React.SetStateAction<number | "">>;
  fileSize: string;
  setFileSize: React.Dispatch<React.SetStateAction<string>>;
  uploadResponse: UploadResponse | null;
  setUploadResponse: React.Dispatch<
    React.SetStateAction<UploadResponse | null>
  >;
  availableFormTypes: ProductType[] | null;
  setAvailableFormTypes: React.Dispatch<
    React.SetStateAction<ProductType[] | null>
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
  selectedFormID,
  setSelectedFormID,
  fileSize,
  setFileSize,
  uploadResponse,
  setUploadResponse,
  availableFormTypes,
  setAvailableFormTypes,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadResponse(null);
      setLoadedProduct(false);
      setLoading(true);

      try {
        setSelectedFile(file);
        const selectedProductName = file.name;
        const fileSizeFormatted = formatFileSize(file.size);
        setFileSize(fileSizeFormatted);
        setProductName(selectedProductName);
      } catch (error) {
        console.error("File processing error: ", error);
      } finally {
        setLoading(false);
      }

      event.target.value = "";
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateMetadataFields = (
    metadataForm: MetadataTypeForm,
    extractedMetadata: UploadJSON
  ): MetadataTypeForm => {
    const updatedFields = metadataForm.metadata_fields.map((field) => {
      const jsonValue = extractedMetadata.metadata[field.iso_xml_path];
      if (jsonValue !== undefined) {
        return { ...field, default_value: jsonValue.toString().trim() };
      }
      return field;
    });
    return { ...metadata, metadata_fields: updatedFields };
  };

  const handleGetFormType = async (id: number | "") => {
    try {
      setLoading(true);
      const response = await getFormType(id);
      const data: MetadataTypeForm | null = response;

      if (data) {
        setMetadata(data);
        toast.success("Formulário liberado: Inicie o preenchimento", {
          autoClose: 2000,
        });
        setDisabledItems([false, false]);
        setSelectedItem("Editar Metadados");
      }
    } catch (error) {
      console.error("Error in handleGetFormType:", error);
    } finally {
      setLoading(false); // Stop loading spinner or any related action
    }
  };

  const handleSendProduct = async () => {
    try {
      setLoading(true);
      const response = await postGeoproduct(selectedFile);
      const data: UploadResponse = response; // Extracting the data part

      setUploadResponse(data); // This should now match the UploadResponse type
      setAvailableFormTypes(data.product_types || []);
      setLoadedProduct(true);
      toast.success("Arquivo validado com sucesso!", { autoClose: 2000 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          toast.error("Falha na conexão: Erro ao conectar com o servidor.", {
            autoClose: 4000,
          });
        } else {
          toast.error("Este arquivo não é válido", { autoClose: 2000 });
        }
      } else {
        toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.", {
          autoClose: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <input
        type="file"
        accept="*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{ marginRight: 2, fontFamily: "Nunito", fontWeight: "bold" }}
            onClick={handleUploadClick}
            disabled={loading}
          >
            Adicionar novo
          </Button>

          {/*<Button
            variant="contained"
            color="success"
            startIcon={<PanToolAlt />}
            sx={{ fontFamily: "Nunito", fontWeight: "bold" }}
            disabled={loading}
          >
            Selecionar produto
          </Button>*/}

          {selectedFile && (
            <FileDetails
              fileName={productName}
              fileSize={fileSize}
              onSubmit={handleSendProduct}
              uploadResponse={uploadResponse}
              onDelete={() => {
                setLoadedProduct(false);
                setProductName("");
                setSelectedFile(null);
                setFileSize("");
                setMetadata(null);
                setUploadResponse(null);
                setDisabledItems([false, true]);
                setSelectedFormID("");
              }}
            />
          )}

          {isLoadedProduct && (
            <Box sx={{ mt: 6, width: 600, mb: 6 }}>
              <Typography
                style={{ marginBottom: 5, marginLeft: 5, fontFamily: "Nunito" }}
              >
                Selecione o tipo de formulário para o produto carregado acima
                (Obrigatório)
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Select
                  value={selectedFormID}
                  onChange={(event) =>
                    setSelectedFormID(event.target.value as number)
                  }
                  displayEmpty
                  fullWidth
                  sx={{ fontFamily: "Nunito", flex: 1 }}
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Tipos disponíveis
                  </MenuItem>
                  {availableFormTypes &&
                    availableFormTypes.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>

                <Button
                  sx={{
                    marginLeft: 2,
                    fontWeight: "bold",
                    fontFamily: "Nunito",
                    whiteSpace: "nowrap",
                  }}
                  variant="contained"
                  color="success"
                  onClick={() => handleGetFormType(selectedFormID)}
                  disabled={selectedFormID === "" || loading} // Enable when a product is selected
                >
                  Gerar Formulário
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductUpload;
