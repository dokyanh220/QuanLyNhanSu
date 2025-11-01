import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from './slice/employeeSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
});
