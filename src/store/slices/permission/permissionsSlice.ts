import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission } from '../../../interface/permission.interface';
import { RootState } from '../../store';

interface PermissionsState {
  list: Permission[];
}

const initialState: PermissionsState = {
  list: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<Permission[]>) {
      state.list = action.payload;
    },
    addPermission(state, action: PayloadAction<Permission>) {
      state.list.push(action.payload);
    },
    updatePermission(state, action: PayloadAction<Permission>) {
      const updatedPermission = action.payload;
      state.list = state.list.map((perm) =>
        perm.id === updatedPermission.id ? updatedPermission : perm
      );
    },
  },
});

export const { setPermissions, addPermission, updatePermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;

export const selectAllPermissions = (state: RootState) => state.permissions.list;
