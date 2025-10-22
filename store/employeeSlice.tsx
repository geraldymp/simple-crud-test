import { IEmployee } from "@/types/IEmployee";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "https://dummy.restapiexample.com/api/v1";

interface EmployeesState {
  employees: IEmployee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

export const getEmployees = createAsyncThunk("employees/get", async () => {
  const res = await fetch(`${API_URL}/employees`);
  const json = await res.json();
  return json.data as IEmployee[];
});

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (newEmp: Omit<IEmployee, "id">) => {
    // NOTE:
    // Mock API too often giving 'Too Many Requests'
    // So I modified this function to always add the data
    // Even when the response failed
    // Also giving console to easily show the response
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmp),
    });
    const text = await res.text();
    console.log("create text", text);

    try {
      const json = JSON.parse(text);
      return json.data as IEmployee;
    } catch (err) {
      console.warn("Failed to parse JSON:", err);
      return { ...newEmp, id: 99 };
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (emp: IEmployee) => {
    // NOTE:
    // Mock API too often giving 'Too Many Requests'
    // So I modified this function to always update the data
    // Even when the response failed
    // Also giving console to easily show the response
    const res = await fetch(`${API_URL}/update/${emp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emp),
    });
    const text = await res.text();
    console.log("update text", text);

    try {
      console.log("correct update");
      const json = JSON.parse(text);
      return json.data as IEmployee;
    } catch (err) {
      console.warn("Failed to parse JSON:", err);
      return emp;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: number) => {
    // NOTE:
    // Mock API too often giving 'Too Many Requests'
    // So I modified this function to always delete the selected data
    // Even when the response failed
    await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
    return id;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get employees";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.employees.findIndex(
          (e) => e.id === action.payload.id
        );
        if (idx !== -1) state.employees[idx] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (e) => e.id !== action.payload
        );
      });
  },
});

export default employeesSlice.reducer;
