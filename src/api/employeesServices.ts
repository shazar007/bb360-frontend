import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";
export const addEmployee = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEES, values);
};
export const getAllEmployees = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEES);
};

export const updateEmploye = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEES}/${id}`, values);
};

export const uploadFile = (file: File, fileType: string = "images") => {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");

  return HTTP_CLIENT.post(
    `${ENDPOINTS.UPLOAD_IMAGE}?fileType=${fileType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
