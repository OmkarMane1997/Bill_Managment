import { createSlice} from '@reduxjs/toolkit'

const initialState = {
  role: '',
}

export const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userRole(state,action){
      // console.log('role', action.payload)
      state.role = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { userLogin,userRole } = userSlice.actions;

export default userSlice.reducer;