import axios from "axios"

const EMPLOYEE_API = "https://68fcd0c596f6ff19b9f65947.mockapi.io/api/v1"

export const findEmployees = async () => {
  let result = null;
  try {
    result = await axios.get(`${EMPLOYEE_API}/employee`);
  } catch (e) {
    console.log("Get employees API error: " + e);
  }
  return result;
};

export const findEmployee = async (employeeId) => {
  let result = null;
  try {
    result = await axios.get(`${EMPLOYEE_API}/employee/${employeeId}`);
  } catch (e) {
    console.log("Find employee API error: " + e);
  }
  return result;
};

export const createEmployee = async (employee) => {
  let result = null;
  try {
    result = await axios.post(`${EMPLOYEE_API}/employee`, employee);
  } catch (e) {
    console.log("Create employee API error: " + e);
  }
  return result;
};

export const updateEmployee = async (employee) => {
  let result = null;
  try {
    result = await axios.put(`${EMPLOYEE_API}/employee/${employee.id}`, employee);
  } catch (e) {
    console.log("Update employee API error: " + e);
  }
  return result;
};

export const deleteEmployee = async (employeeId) => {
  let result = null;
  try {
    result = await axios.delete(`${EMPLOYEE_API}/employee/${employeeId}`);
  } catch (e) {
    console.log("Delete employee API error: " + e);
  }
  return result;
};