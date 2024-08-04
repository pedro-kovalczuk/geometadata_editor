import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ProductUpload from "./ProductUpload";
import MetadataEditor from "./MetadataEditor";
import { MetadataTypeForm } from "../interfaces/app_interfaces";


interface MainContentProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string;
  setDisabledItems: (items: boolean[]) => void;
}

const MainContent: React.FC<MainContentProps> = ({ setSelectedItem, selectedItem, setDisabledItems }) => {
  const [isLoadedProduct, setLoadedProduct] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");

  const [metadata, setMetadata] = useState<MetadataTypeForm | null>(null);

  return (
    <Box sx={{ flexGrow: 1, p: 10, mt: 4, ml: -3, pl: 40}}>
      <Typography sx={{ mb: 5, fontWeight: 'bold', fontFamily: 'Nunito' }}>
        {isLoadedProduct ? (
          <>
            <span style={{ color: 'blue' }}>{productName}</span> {/* Product name in blue */}
            {metadata && metadata.name && (
              <>
                {" / "}
                <span style={{ color: 'green' }}>{metadata.name}</span> {/* Metadata name in green */}
              </>
            )}
          </>
        ) : 'Nenhum produto carregado'}
      </Typography>
      { selectedItem === "Upload do produto" &&
        <ProductUpload
        setDisabledItems={setDisabledItems} 
        setProductName={setProductName} 
        isLoadedProduct={isLoadedProduct} 
        setLoadedProduct={setLoadedProduct}
        metadata={metadata}
        setMetadata={setMetadata}
        setSelectedItem={setSelectedItem}
      />}
      { selectedItem === "Editar Metadados" &&
        <MetadataEditor metadata={metadata} setMetadata={setMetadata}/>
      }
    </Box>
  );
};

export default MainContent;
