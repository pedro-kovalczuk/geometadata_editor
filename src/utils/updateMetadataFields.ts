import cadastro from "../assets/cadastroGeral.json";
import { UploadResponse } from "../types/apiTypes";
import { MetadataTypeForm } from "../types/appTypes";

export const updateMetadataFields = (
  metadataForm: MetadataTypeForm,
  extractedMetadata: UploadResponse,
  formID: number | ""
): MetadataTypeForm => {
  const updatedFields = metadataForm.metadata_fields.map((field) => {
    const jsonValue = extractedMetadata.file_fields[field.iso_xml_path];
    const cadastroValue = (cadastro as Record<string, string>)[
      field.iso_xml_path
    ];

    if (field.field_type === "date") {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}/${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}/${today.getFullYear()}`;
      return { ...field, default_value: formattedDate };
    }

    // Check if jsonValue is not null or undefined before calling toString()
    if (jsonValue !== undefined && jsonValue !== null) {
      return { ...field, default_value: jsonValue.toString().trim() };
    }
    if (
      field.iso_xml_path === "MD_Metadata-fileIdentifier" &&
      extractedMetadata.file_id
    ) {
      return {
        ...field,
        default_value: extractedMetadata.file_id.toString().trim(),
      };
    }
    if (field.iso_xml_path === "MD_Identification-citation-series-name") {
      const product = extractedMetadata.product_types.find(
        (item) => item.id === formID
      );
      let productName = product ? product.name.toString() : null;
      if (productName && productName.includes("(")) {
        productName = productName.split("(")[0].trim();
      }
      return { ...field, default_value: productName };
    }
    if (cadastroValue !== undefined && cadastroValue !== null) {
      if (cadastroValue.includes(",")) {
        return { ...field, possible_values: cadastroValue.toString().trim() };
      } else {
        return {
          ...field,
          possible_values: cadastroValue.toString().trim(),
          default_value: cadastroValue.toString().trim(),
        };
      }
    }
    return field;
  });

  return { ...metadataForm, metadata_fields: updatedFields };
};
