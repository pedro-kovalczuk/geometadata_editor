import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PanToolAlt from "@mui/icons-material/PanToolAlt";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from '@mui/material';
import { SelectChangeEvent } from "@mui/material/Select"; 
import { MetadataTypeForm, UploadJSON } from '../interfaces/app_interfaces';

import upload_data from '../assets/upload_response_example.json';
import product_data from '../assets/product_type_form-response.json';

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
	setSelectedItem
}) => {
	const [productID, setProductID] = useState<number | "">(""); // Ensure productID can only be a number or empty string

	const handleUpload = () => {
		const productName = upload_data.serializer_data.geodata_file;
		const parts = productName.split('/');
		setProductName(parts[parts.length - 1]);
		setLoadedProduct(true);
	};

	const updateMetadataFields = (metadata: MetadataTypeForm, jsonData: UploadJSON): MetadataTypeForm => {
		const updatedFields = metadata.metadata_fields.map(field => {
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
		const selectedMetadata = product_data.find(item => item.id === selectedID) || null;
		if (selectedMetadata) {
			const updatedMetadata = updateMetadataFields(selectedMetadata, upload_data);
			setMetadata(updatedMetadata);
			setDisabledItems([false, false, false, false, false, false]);
			console.log(updatedMetadata);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, mt: 4 }}>
			<Button
				variant="contained"
				color="success"
				startIcon={<AddIcon />}
				sx={{ marginRight: 2, fontFamily: 'Nunito', fontWeight: 'bold' }}
				onClick={handleUpload}
			>
				Adicionar novo
			</Button>
			<Button
				variant="contained"
				color="success"
				startIcon={<PanToolAlt />}
				sx={{ fontFamily: 'Nunito', fontWeight: 'bold' }}
			>
				Selecionar produto
			</Button>
			{isLoadedProduct && (
				<Box sx={{ mt: 4, width: 500, mb: 6 }}>
					<Typography style={{ marginBottom: 5, marginLeft: 5, fontFamily: 'Nunito' }}>
						Selecione o tipo do produto carregado acima (Obrigatório)
					</Typography>
					<Select
						value={productID}
						onChange={handleChange}
						displayEmpty
						fullWidth
						sx={{ fontFamily: 'Nunito' }}
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
					sx={{ justifyContent: "flex-end", marginLeft: 34, fontWeight: 'bold', fontFamily: 'Nunito' }}
					variant="text"
					color="success"
					endIcon={<ArrowForwardIcon />}
					onClick={() => setSelectedItem("Editar Metadados")}
				>
					Preencher Metadados
				</Button>
			)}
		</Box>
	);
};

export default ProductUpload;
