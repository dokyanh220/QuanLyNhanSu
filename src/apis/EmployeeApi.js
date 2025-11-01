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
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const findEmployees = async () => {
  try {
    const response = await axiosInstance.get('/employee');
    return response;
  } catch (error) {
    console.error("Get employees API error:", error);
    throw error;
  }
};

export const findEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/employee/${employeeId}`);
    return response;
  } catch (error) {
    console.error("Find employee API error:", error);
    throw error;
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axiosInstance.post('/employee', employee);
    return response;
  } catch (error) {
    console.error("Create employee API error:", error);
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await axiosInstance.put(`/employee/${employee.id}`, employee);
    return response;
  } catch (error) {
    console.error("Update employee API error:", error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.delete(`/employee/${employeeId}`);
    return response;
  } catch (error) {
    console.error("Delete employee API error:", error);
    throw error;
  }
};