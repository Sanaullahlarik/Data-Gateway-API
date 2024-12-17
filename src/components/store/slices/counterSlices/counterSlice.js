import { createSlice } from '@reduxjs/toolkit';

// import counterReducer from './slices/counterSlices/counterSlice';

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 100, 
  },
  reducers: {}, 
});

export default counterSlice.reducer;
