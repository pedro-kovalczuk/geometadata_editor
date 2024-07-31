import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PanToolAlt from "@mui/icons-material/PanToolAlt";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select"; 

import upload_data from '../assets/upload_response_example.json';
import product_data from '../assets/product_type_form-response.json';
import { Typography } from '@mui/material';

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

interface UploadComponentProps {
	setDisabledItems: (items: boolean[]) => void;
	setProductName: (items: string) => void;
	isLoadedProduct: boolean;
	setLoadedProduct: (items: boolean) => void;
	metadata: Metadata | null;
	setMetadata: React.Dispatch<React.SetStateAction<Metadata | null>>;
	setSelectedItem: (item: string) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ 
	setDisabledItems , 
	setProductName, 
	isLoadedProduct, 
	setLoadedProduct,
	metadata,
	setMetadata,
	setSelectedItem
}) => {

	const [productID, setProductID] = useState<number>(0);

	const handleUpload = () => {
		const productName = upload_data.serializer_data.geodata_file;
		const parts = productName.split('/');
  	setProductName(parts[parts.length - 1]);
		setLoadedProduct(true);
	}

	const handleChange = (event: SelectChangeEvent<number>) => {
		const selectedID = Number(event.target.value);
    setProductID(selectedID);
    const selectedMetadata = product_data.find(item => item.id === selectedID) || null;
    setMetadata(selectedMetadata);
		setDisabledItems([false, false, false, false, false, false]);
		console.log(selectedMetadata);
  };


  return (
    <Box sx={{ flexGrow: 1 ,mt: 4}}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{ marginRight: 2 }}
				onClick={handleUpload}
      >
        Adicionar novo
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<PanToolAlt />}
      >
        Selecionar produto
      </Button>
			{isLoadedProduct && (
        <Box sx={{ mt: 4 , width: 500, mb: 6}}>
				<Typography style={{marginBottom: 5, marginLeft: 5}}>
					Selecione o tipo do produto carregado acima (Obrigatório)
				</Typography>
          <Select
            value={productID}
            onChange={handleChange}
            displayEmpty
            fullWidth
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
			{metadata &&
				<Button
					sx={{ justifyContent: "flex-end" , marginLeft: 34, fontWeight: 'bold'}}
        	variant="text"
        	color="success"
        	endIcon={<ArrowForwardIcon />}
					onClick={() => setSelectedItem("Metametadados")}
      	>
        	Preencher Metadados
      	</Button>
			}
    </Box>
  );
};

export default UploadComponent;
