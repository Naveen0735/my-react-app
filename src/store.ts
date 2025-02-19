import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface FormState {
  formData: { [key: string]: string };
}

const initialState: FormState = {
  formData: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    }
  }
});

export const { saveFormData } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
