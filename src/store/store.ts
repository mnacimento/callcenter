import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from './slices/spinner/spinnerSlice';
import rolesReducer from './slices/roles/rolesSlice';
import usersReducer from './slices/user/usersSlice';
import permissionsReducer from './slices/permission/permissionsSlice';
import storeReducer from './slices/stores/storesSlice';
import paginatorReducer from './slices/paginator/Paginator';


export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    roles: rolesReducer,
    users: usersReducer,
    permissions: permissionsReducer,
    stores: storeReducer,
    paginator: paginatorReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
