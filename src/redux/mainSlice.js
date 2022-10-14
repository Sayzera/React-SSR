import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: 'sezer',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;

// Selectors

export const selectName = (state) => state.main.name;
