import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpinnerState {
  isLoading: boolean;
}

const initialState: SpinnerState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner(state) {
      state.isLoading = true;
    },
    hideSpinner(state) {
      state.isLoading = false;
    },
    setSpinner(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { showSpinner, hideSpinner, setSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
