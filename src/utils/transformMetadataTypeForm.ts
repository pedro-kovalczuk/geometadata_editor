import { SubmissionMetadataField } from "../types/apiTypes";
import { MetadataTypeForm } from "../types/appTypes";

export const transformMetadataTypeForm = (
  input: MetadataTypeForm
): SubmissionMetadataField[] => {
  return input.metadata_fields.map((field) => ({
    iso_xml_path: field.iso_xml_path,
    value:
      field.field_type === "date"
        ? field.default_value.split("-").reverse().join("/")
        : field.default_value,
  }));
};
