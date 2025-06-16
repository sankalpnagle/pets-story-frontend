import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeadState {
  head: boolean;
}

const initialState: HeadState = {
  head: true,
};

const HeadSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    HeaderToggle: (state) => {
      state.head = !state.head; // Toggle the value of head
    },
  },
});

export const { HeaderToggle } = HeadSlice.actions;

export default HeadSlice.reducer;
