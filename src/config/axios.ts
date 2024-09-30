import axios, { AxiosResponse } from "axios";
import { Response } from "../types/apiTypes"; // Import the UploadResponse type

export const uploadProduct = async (file: File | null): Promise<Response> => {
  const formData = new FormData();
  if (file) {
    formData.append("geodata_file", file); // Append the file object
  }

  try {
    const response: AxiosResponse<Response> = await axios.post(
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
