import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: string = 'FormContactScreen';

export const formScreenSlice = createSlice({
  name: 'formScreen',
  initialState,
  reducers: {
    updateScreen: (state, action: PayloadAction<string>) => action.payload
  }
})

export const {updateScreen} = formScreenSlice.actions;

export default formScreenSlice.reducer;
