import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../../../interface/store.interface';
import { RootState } from '../../store';

interface StroresState {
    list: Store[];
}

const initialState: StroresState = {
    list: [],
};

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setStores(state, action: PayloadAction<Store[]>) {
            state.list = action.payload;
        },
        addStore(state, action: PayloadAction<Store>) {
            state.list.push(action.payload);
        },
        updateStore(state, action: PayloadAction<Store>) {
            const updatedStore = action.payload;
            state.list = state.list.map((store) =>
                store.id === updatedStore.id ? updatedStore : store
            );
        },
    },
});

export const { setStores, addStore, updateStore } = storesSlice.actions;
export default storesSlice.reducer;

export const selectAllStores = (state: RootState) => state.stores.list;
