import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    profileImage: '',
  },
  data:null
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload ;
     
    },
    UserData (state,action){
      state.data = action.payload
    }
    // updateProfileImage(state, action) {
    //   state.profile.profileImage = action.payload;
    //   console.log("Image",state.profile.profileImage )
    // },
  },
});

export const { setProfile, UserData } = userProfileSlice.actions;

export default userProfileSlice.reducer;
