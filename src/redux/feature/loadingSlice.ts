import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface ProjectState {
  isLoading: boolean;
  isClosing: boolean;
}

const initialState: ProjectState = {
  isLoading: false, // Default loading state
  isClosing: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setClosing(state, action: PayloadAction<boolean>) {
      state.isClosing = action.payload;
    },
  },
});

export const { setLoading , setClosing} = projectSlice.actions;
export default projectSlice.reducer;
