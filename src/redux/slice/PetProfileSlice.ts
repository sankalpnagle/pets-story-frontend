import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PetProfileState {
  petData: {
    name: string;
    breed: string;
    color: string;
    gender: string;
    about: string;
    neuteredOrSpayed: string;
    rfidChipStatus: string;
    profileImage: string | null;
  };
}

const initialState: PetProfileState = {
  petData: {
    name: "",
    breed: "",
    color: "",
    gender: "",
    about: "",
    neuteredOrSpayed: "",
    rfidChipStatus: "",
    profileImage: null,
  },
};

const petProfileSlice = createSlice({
  name: "petProfile",
  initialState,
  reducers: {
    setPetData: (state, action: PayloadAction<typeof initialState.petData>) => {
      state.petData = action.payload;
    },
    clearPetData: (state) => {
        console.log('ClearData',initialState.petData)
      state.petData = initialState.petData;
    },
  },
});

export const { setPetData, clearPetData } = petProfileSlice.actions;

export default petProfileSlice.reducer;
