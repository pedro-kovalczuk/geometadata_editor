import axios, { AxiosResponse } from "axios";
import { APIResponse, UploadResponse } from "../types/apiTypes"; // Import the UploadResponse type
import { MetadataTypeForm } from "../types/appTypes";

export const postGeoproduct = async (
  file: File | null
): Promise<UploadResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append("geodata_file", file); // Append the file object
  }

  try {
    const response: AxiosResponse<UploadResponse> = await axios.post(
      "http://localhost:8000/geoproduct/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios sets this automatically, but you can specify it as well
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Throw the error to be caught in the calling function
  }
};

export const postXMLData = async (
  xmlFile: File | null,
  geoproductID: number | null
): Promise<APIResponse> => {
  const formData = new FormData();
  if (xmlFile) {
    formData.append("xml_metadata_file", xmlFile); // Append the file object
  }
  try {
    const response: AxiosResponse<APIResponse> = await axios.post(
      `http://localhost:8000/geoproduct/${geoproductID}/send_xml_metadata/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios sets this automatically, but you can specify it as well
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Throw the error to be caught in the calling function
  }
};

export const getFormType = async (
  id: number | ""
): Promise<MetadataTypeForm | null> => {
  if (!id) {
    return null; // Handle case where id is empty
  }

  try {
    const response: AxiosResponse<MetadataTypeForm> = await axios.get(
      `http://localhost:8000/product_types/${id}/`
    );
    return response.data; // Return the form data
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null; // Return null in case of error
  }
};

export const getFromCadastroGeral = async (): Promise<APIResponse[]> => {
  const urls: string[] = [
    "http://localhost:8000/cadastro_geral/MD_DataIdentification-extent-verticalExtent-verticalDatum",
    "http://localhost:8000/cadastro_geral/MD_Identification-citation-collectiveTitle",
    "http://localhost:8000/cadastro_geral/MD_Metadata-contact-individualName",
    "http://localhost:8000/cadastro_geral/MD_Metadata-contact-organisationName",
  ];

  try {
    // Making parallel GET requests, using the generic APIResponse with type T for axios response
    const requests: Promise<AxiosResponse<APIResponse>>[] = urls.map((url) =>
      axios.get<APIResponse>(url)
    );

    // Wait for all the requests to resolve
    const responses = await Promise.all(requests);

    // Return only the data from the responses
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
