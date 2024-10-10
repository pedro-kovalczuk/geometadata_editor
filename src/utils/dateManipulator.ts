import { MetadataField } from "../types/appTypes";

const formatDateToDDMMYYYY = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatDateToYYYYMMDD = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const getDefaultDateValue = (field: MetadataField) => {
  // If the default value is empty, set today's date in DD/MM/YYYY format
  if (!field.default_value) {
    return formatDateToDDMMYYYY(new Date().toISOString().split("T")[0]);
  }
  // Convert the existing value from YYYY-MM-DD to DD/MM/YYYY
  return field.default_value.includes("-")
    ? formatDateToDDMMYYYY(field.default_value)
    : field.default_value;
};
