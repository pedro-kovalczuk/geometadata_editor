import { UploadResponse } from "../types/apiTypes";
import { MetadataTypeForm } from "../types/appTypes";

export const updateMetadataFields = (
  metadataForm: MetadataTypeForm,
  extractedMetadata: UploadResponse
): MetadataTypeForm => {
  const updatedFields = metadataForm.metadata_fields.map((field) => {
    const jsonValue = extractedMetadata.file_fields[field.iso_xml_path];

    // Check if jsonValue is not null or undefined before calling toString()
    if (jsonValue !== undefined && jsonValue !== null) {
      return { ...field, default_value: jsonValue.toString().trim() };
    }
    return field;
  });

  return { ...metadataForm, metadata_fields: updatedFields };
};
