import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Response } from "../types/apiTypes";
import { MetadataTypeForm, ProductType } from "../types/appTypes";
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
  const [fileSize, setFileSize] = useState<string>(""); // Add fileSize state
  const [availableFormTypes, setAvailableFormTypes] =
    useState<ProductType | null>(null);
  const [metadata, setMetadata] = useState<MetadataTypeForm | null>(null);
  const [uploadResponse, setUploadResponse] = useState<Response | null>(null);

  console.log(uploadResponse);

  return (
    <Box sx={{ flexGrow: 1, p: 10, mt: 4, ml: -3, pl: 40 }}>
      <Typography sx={{ mb: 5, fontWeight: "bold", fontFamily: "Nunito" }}>
        {isLoadedProduct ? (
          <>
            <span style={{ color: "blue" }}>{productName}</span>{" "}
            {/* Product name in blue */}
            {metadata && metadata.name && (
              <>
                {" / "}
                <span style={{ color: "green" }}>{metadata.name}</span>{" "}
                {/* Metadata name in green */}
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
          fileSize={fileSize} // Pass fileSize as prop
          setFileSize={setFileSize} // Pass fileSize setter
          uploadResponse={uploadResponse}
          setUploadResponse={setUploadResponse}
          availableFormTypes={availableFormTypes}
          setAvailableFormTypes={setAvailableFormTypes}
        />
      )}
      {selectedItem === "Editar Metadados" && (
        <MetadataEditor metadata={metadata} setMetadata={setMetadata} />
      )}
    </Box>
  );
};

export default MainContent;
