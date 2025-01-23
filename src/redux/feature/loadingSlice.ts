import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  isLoading: boolean;
}

const initialState: ProjectState = {
  isLoading: false, // Default loading state
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = projectSlice.actions;
export default projectSlice.reducer;
