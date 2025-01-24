import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface ProjectState {
  isLoading: boolean;
  isClosing: boolean;
  selectedIndex: number | null;
}

const initialState: ProjectState = {
  isLoading: false, // Default loading state
  isClosing: false,
  selectedIndex: null,
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
    setSelectedIndex(state, action: PayloadAction<number | null>) {
      state.selectedIndex = action.payload; // Update selectedIndex
    },
  },
});

export const { setLoading, setClosing , setSelectedIndex} = projectSlice.actions;
export default projectSlice.reducer;
