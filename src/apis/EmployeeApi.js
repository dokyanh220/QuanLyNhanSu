import axios from "axios"

const EMPLOYEE_API = "https://68fcd0c596f6ff19b9f65947.mockapi.io/api/v1"

// Cấu hình axios instance
const axiosInstance = axios.create({
  baseURL: EMPLOYEE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export const findEmployees = async () => {
  const response = await axiosInstance.get('/employee');
  return response;
};

export const findEmployee = async (employeeId) => {
  const response = await axiosInstance.get(`/employee/${employeeId}`);
  return response;
};

export const createEmployee = async (employee) => {
  const response = await axiosInstance.post('/employee', employee);
  return response;
};

export const updateEmployee = async (employee) => {
  const response = await axiosInstance.put(`/employee/${employee.id}`, employee);
  return response;
};

export const deleteEmployee = async (employeeId) => {
  const response = await axiosInstance.delete(`/employee/${employeeId}`);
  return response;
};