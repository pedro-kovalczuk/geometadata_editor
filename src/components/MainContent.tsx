import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import UploadComponent from "./UploadComponent";

interface MainContentProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string;
  setDisabledItems: (items: boolean[]) => void;
}

interface MetadataField {
  id: number;
  label: string;
  iso_xml_path: string;
  field_type: string;
  is_static: boolean;
  possible_values: string;
  default_value: string;
  comments: string;
  old_path: string;
}

interface Metadata {
  id: number;
  name: string;
  metadata_fields: MetadataField[];
}

const MainContent: React.FC<MainContentProps> = ({ setSelectedItem, selectedItem, setDisabledItems }) => {
  const [isLoadedProduct, setLoadedProduct] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");

  const [metadata, setMetadata] = useState<Metadata | null>(null);

  return (
    <Box sx={{ flexGrow: 1, p: 10, mt: 4, ml: -3}}>
      <Typography sx={{mb: 2, fontWeight: 'bold'}}>
        {isLoadedProduct ? `${productName} ${metadata && metadata.name ? "  /  " + metadata.name : ''}` : 'Nenhum produto carregado'}
      </Typography>
      { selectedItem === "Upload do produto" &&
        <UploadComponent 
        setDisabledItems={setDisabledItems} 
        setProductName={setProductName} 
        isLoadedProduct={isLoadedProduct} 
        setLoadedProduct={setLoadedProduct}
        metadata={metadata}
        setMetadata={setMetadata}
        setSelectedItem={setSelectedItem}
      />}
    </Box>
  );
};

export default MainContent;
