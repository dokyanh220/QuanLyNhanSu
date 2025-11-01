import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  findEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../apis/EmployeeApi";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getEmployees = createAsyncThunk("employee/list", async () => {
  const response = await findEmployees();
  console.log('API Response:', response);
  console.log('API Data:', response.data);
  return response.data;
});

export const getEmployee = createAsyncThunk("employee/detail", async (employeeId) => {
  const response = await findEmployee(employeeId);
  return response.data;
});

export const addEmployee = createAsyncThunk("employee/create", async (employee) => {
  const response = await createEmployee(employee);
  return response.data;
});

export const editEmployee = createAsyncThunk("employee/edit", async (employee) => {
  const response = await updateEmployee(employee);
  return response.data;
});

export const removeEmployee = createAsyncThunk("employee/remove", async (employeeId) => {
  const response = await deleteEmployee(employeeId);
  return response.data;
});

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      })

      .addCase(getEmployee.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })

      .addCase(addEmployee.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })

      .addCase(editEmployee.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })

      .addCase(removeEmployee.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      });
  },
});

export const { setLoading, setError, setSuccess } = employeeSlice.actions;

export const selectLoading = (state) => state.employee.loading;
export const selectError = (state) => state.employee.error;
export const selectSuccess = (state) => state.employee.success;
export const selectEmployeeList = (state) => state.employee.values;
export const selectEmployeeDetail = (state) => state.employee.value;
export const selectEmployeeAdded = (state) => state.employee.value;
export const selectEmployeeEdited = (state) => state.employee.value;
export const selectEmployeeRemoved = (state) => state.employee.value;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
  const currentValue = selectLoading(getState());
  if (currentValue === isCalled) {
    dispatch(setLoading(true));
  }
};

export default employeeSlice.reducer;
