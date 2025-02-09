import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Role } from '../../../interface/role.interface';

interface RolesState {
    list: Role[];
}

const initialState: RolesState = {
    list: [],
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles(state, action: PayloadAction<Role[]>) {
            state.list = action.payload;
        },
        addRole(state, action: PayloadAction<Role>) {
            state.list.push(action.payload);
        },
        updateRole(state, action: PayloadAction<Role>) {
            const updatedRole = action.payload;
            state.list = state.list.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
            );
        },
    },
});

export const { setRoles, addRole, updateRole } = rolesSlice.actions;
export default rolesSlice.reducer;

export const selectAllRoles = (state: RootState) => state.roles.list;
