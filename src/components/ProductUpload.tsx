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
import {
  getFormType,
  getFromCadastroGeral,
  postGeoproduct,
  postXMLData,
} from "../config/axios";
import { APIResponse, ProductType, UploadResponse } from "../types/apiTypes";
import { MetadataTypeForm, ProductState } from "../types/appTypes";
import { formatFileSize } from "../utils/formatFileSize";
import { updateMetadataFields } from "../utils/updateMetadataFields";
import ErrorModal from "./ErrorModal";
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
  productUploadResponse: UploadResponse | null;
  setUploadResponse: React.Dispatch<
    React.SetStateAction<UploadResponse | null>
  >;
  availableFormTypes: ProductType[] | null;
  setAvailableFormTypes: React.Dispatch<
    React.SetStateAction<ProductType[] | null>
  >;
  selectedXML: ProductState;
  setSelectedXML: React.Dispatch<React.SetStateAction<ProductState>>;
  xmlUploadResponse: APIResponse | null;
  setXMLUploadResponse: React.Dispatch<
    React.SetStateAction<APIResponse | null>
  >;
  cadastroGeralData: APIResponse[];
  setCadastroGeralData: React.Dispatch<React.SetStateAction<APIResponse[]>>;
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
  productUploadResponse,
  setUploadResponse,
  availableFormTypes,
  setAvailableFormTypes,
  selectedXML,
  setSelectedXML,
  xmlUploadResponse,
  setXMLUploadResponse,
  cadastroGeralData,
  setCadastroGeralData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Separate refs for product and XML files
  const productFileInputRef = useRef<HTMLInputElement | null>(null);
  const xmlFileInputRef = useRef<HTMLInputElement | null>(null);

  const [inputKey, setInputKey] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

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
        setSelectedXML({
          isLoadedProduct: false,
          productName: "",
          selectedFile: null,
          fileSize: "",
        });
      } catch (error) {
        console.error("File processing error: ", error);
      } finally {
        setLoading(false);
      }

      event.target.value = "";
    }
  };

  const handleXMLChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setLoading(true);

      try {
        setDisabledItems([false, true]);
        const fileSizeFormatted = formatFileSize(file.size);
        setSelectedXML((prevState) => ({
          ...prevState,
          isLoadedProduct: true,
          productName: file.name,
          selectedFile: file,
          fileSize: fileSizeFormatted,
        }));
      } catch (error) {
        console.error("File processing error: ", error);
      } finally {
        setLoading(false);
      }
      event.target.value = "";
    }
  };

  const handleUploadClick = () => {
    if (productFileInputRef.current) {
      productFileInputRef.current.click();
    }
  };

  const handleXMLUploadClick = () => {
    if (xmlFileInputRef.current) {
      xmlFileInputRef.current.click();
    }
  };

  const resetFileInput = () => {
    setInputKey((prevKey) => prevKey + 1); // Change the key to force re-render
  };

  const handleGetFormType = async (id: number | "") => {
    try {
      setLoading(true);
      const response = await getFormType(id);
      const data: MetadataTypeForm | null = response;

      if (data) {
        setMetadata(data);

        const cadastroData = await getFromCadastroGeral();

        if (cadastroData) {
          setCadastroGeralData(cadastroData);
        }

        if (productUploadResponse) {
          const updatedMetadata = updateMetadataFields(
            data,
            productUploadResponse,
            selectedFormID
          );
          setMetadata(updatedMetadata);
        }
        toast.success("Formulário liberado: Inicie o preenchimento", {
          autoClose: 2000,
        });
        setDisabledItems([false, false]);
        setSelectedItem("Editar Metadados");
      }
    } catch (error) {
      console.error("Error in handleGetFormType:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendProduct = async () => {
    try {
      setLoading(true);
      const response = await postGeoproduct(selectedFile);
      const data: UploadResponse = response;

      setUploadResponse(data);
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

  const handleSendXML = async () => {
    try {
      setLoading(true);
      const fileId = productUploadResponse?.file_id ?? null;

      if (!fileId) {
        toast.error("Erro: o produto cartográfico não está validado", {
          autoClose: 4000,
        });
        setLoading(false);
        return;
      }

      const response = await postXMLData(
        selectedXML.selectedFile,
        fileId,
        selectedFormID
      );
      setXMLUploadResponse(response);

      setOpenModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          toast.error("Falha na conexão: Erro ao conectar com o servidor.", {
            autoClose: 2000,
          });
        } else {
          toast.error("Este arquivo não é válido", { autoClose: 1000 });
        }
      } else {
        toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.", {
          autoClose: 2000,
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
        ref={productFileInputRef} // Use product file ref here
        onChange={handleFileChange}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography
            style={{ marginBottom: 15, marginLeft: 5, fontFamily: "Nunito" }}
          >
            Adicione o arquivo do produto cartográfico referente aos metadados
          </Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{ marginRight: 2, fontFamily: "Nunito", fontWeight: "bold" }}
            onClick={handleUploadClick}
          >
            Adicionar produto
          </Button>

          {selectedFile && (
            <FileDetails
              fileName={productName}
              fileSize={fileSize}
              onSubmit={handleSendProduct}
              uploadResponse={productUploadResponse}
              statusMessage="Validado"
              onDelete={() => {
                setLoadedProduct(false);
                setProductName("");
                setSelectedFile(null);
                setFileSize("");
                setMetadata(null);
                setUploadResponse(null);
                setDisabledItems([false, true]);
                resetFileInput();
              }}
            />
          )}

          {isLoadedProduct && !selectedXML.isLoadedProduct && (
            <Box sx={{ mt: 6, width: 600, mb: 6 }}>
              <Typography
                style={{ marginBottom: 5, marginLeft: 5, fontFamily: "Nunito" }}
              >
                Selecione o tipo de formulário para o produto carregado acima
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

          {isLoadedProduct && selectedFormID && (
            <Box sx={{ mt: 3, width: 600, mb: 3 }}>
              <input
                type="file"
                accept="*"
                style={{ display: "none" }}
                ref={xmlFileInputRef} // Use XML file ref here
                onChange={handleXMLChange}
              />
              <Typography
                style={{ marginBottom: 5, marginLeft: 5, fontFamily: "Nunito" }}
              >
                Adicione o arquivo XML de metadados do produto acima (Opcional)
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{
                  marginRight: 2,
                  fontFamily: "Nunito",
                  fontWeight: "bold",
                  mt: 1,
                }}
                onClick={handleXMLUploadClick}
                disabled={loading}
              >
                Adicionar XML
              </Button>
            </Box>
          )}

          {selectedXML.selectedFile && (
            <FileDetails
              fileName={selectedXML.productName}
              fileSize={selectedXML.fileSize}
              onSubmit={handleSendXML}
              uploadResponse={xmlUploadResponse}
              statusMessage="Diagnosticado"
              onDelete={() => {
                setSelectedXML({
                  isLoadedProduct: false,
                  productName: "",
                  selectedFile: null,
                  fileSize: "",
                });
                setXMLUploadResponse(null);
                if (selectedFormID !== "" && metadata) {
                  setDisabledItems([false, false]);
                }
              }}
            />
          )}
        </>
      )}
      <ErrorModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        xmlUploadResponse={xmlUploadResponse}
      />
    </Box>
  );
};

export default ProductUpload;
