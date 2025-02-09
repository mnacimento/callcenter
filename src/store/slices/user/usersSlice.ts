import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../interface/user.interface';
import { RootState } from '../../store';

interface UsersState {
    list: User[];
}

const initialState: UsersState = {
    list: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.list = action.payload;
        },
        addUser(state, action: PayloadAction<User>) {
            state.list.push(action.payload);
        },
        updateUser(state, action: PayloadAction<User>) {
            const updatedUser = action.payload;
            state.list = state.list.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
        },
    },
});

export const { setUsers, addUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users.list;
