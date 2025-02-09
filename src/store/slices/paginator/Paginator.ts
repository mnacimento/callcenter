import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageNumber: 1,
  pageSize: 30,
  totalPages: 0,
  totalRecords: 0,
};

const paginatorSlice = createSlice({
  name: 'paginator',
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalRecords: (state, action) => {
      state.totalRecords = action.payload;
    },
    updatePagination: (state, action) => {
      const { pageNumber, pageSize, totalPages, totalRecords } = action.payload;
      state.pageNumber = pageNumber ?? state.pageNumber;
      state.pageSize = pageSize ?? state.pageSize;
      state.totalPages = totalPages ?? state.totalPages;
      state.totalRecords = totalRecords ?? state.totalRecords;
    },
    resetPagination: () => initialState,
  },
});

export const {
  setPageNumber,
  setPageSize,
  setTotalPages,
  setTotalRecords,
  updatePagination,
  resetPagination,
} = paginatorSlice.actions;

export default paginatorSlice.reducer;
