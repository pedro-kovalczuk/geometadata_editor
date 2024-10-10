import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { APIResponse, ProductType, UploadResponse } from "../types/apiTypes";
import { MetadataTypeForm, ProductState } from "../types/appTypes";
import MetadataEditor from "./MetadataEditor";
import ProductUpload from "./ProductUpload";

interface MainContentProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string;
  setDisabledItems: (items: boolean[]) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  setSelectedItem,
  selectedItem,
  setDisabledItems,
}) => {
  const [isLoadedProduct, setLoadedProduct] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedXML, setSelectedXML] = useState<ProductState>({
    isLoadedProduct: false,
    productName: "",
    selectedFile: null,
    fileSize: "",
  });
  const [selectedFormID, setSelectedFormID] = useState<number | "">("");
  const [fileSize, setFileSize] = useState<string>("");
  const [availableFormTypes, setAvailableFormTypes] = useState<
    ProductType[] | null
  >(null);
  const [metadata, setMetadata] = useState<MetadataTypeForm | null>(null);
  const [productUploadResponse, setUploadResponse] =
    useState<UploadResponse | null>(null);
  const [xmlUploadResponse, setXMLUploadResponse] =
    useState<APIResponse | null>(null);
  const [cadastroGeralData, setCadastroGeralData] = useState<APIResponse[]>([]);

  console.log(xmlUploadResponse);

  return (
    <Box sx={{ flexGrow: 1, p: 10, mt: 4, ml: -3, pl: 40 }}>
      <Typography sx={{ mb: 4, fontWeight: "bold", fontFamily: "Nunito" }}>
        {isLoadedProduct ? (
          <>
            <span style={{ color: "blue" }}>{productName}</span>
            {metadata?.name && (
              <>
                {" / "}
                <span style={{ color: "green" }}>{metadata.name}</span>
              </>
            )}
          </>
        ) : (
          "Nenhum produto validado"
        )}
      </Typography>
      {selectedItem === "Upload do produto" && (
        <ProductUpload
          setDisabledItems={setDisabledItems}
          productName={productName}
          setProductName={setProductName}
          isLoadedProduct={isLoadedProduct}
          setLoadedProduct={setLoadedProduct}
          metadata={metadata}
          setMetadata={setMetadata}
          setSelectedItem={setSelectedItem}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          selectedFormID={selectedFormID}
          setSelectedFormID={setSelectedFormID}
          fileSize={fileSize}
          setFileSize={setFileSize}
          productUploadResponse={productUploadResponse}
          setUploadResponse={setUploadResponse}
          availableFormTypes={availableFormTypes}
          setAvailableFormTypes={setAvailableFormTypes}
          selectedXML={selectedXML}
          setSelectedXML={setSelectedXML}
          xmlUploadResponse={xmlUploadResponse}
          setXMLUploadResponse={setXMLUploadResponse}
          cadastroGeralData={cadastroGeralData}
          setCadastroGeralData={setCadastroGeralData}
        />
      )}
      {selectedItem === "Editar Metadados" && (
        <MetadataEditor
          metadata={metadata}
          setMetadata={setMetadata}
          selectedFormID={selectedFormID}
          productUploadResponse={productUploadResponse}
        />
      )}
    </Box>
  );
};

export default MainContent;
