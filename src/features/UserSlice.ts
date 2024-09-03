import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
//import { getUsers } from '../utils/Fetch';

interface userState {
  users: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  users: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users').then(
    response => response.json(),
  );

  console.log('🚀 ~ fetchUsers ~ users:', users);
  return users;
});

console.log('🚀 ~ fetchUsers ~ users:', fetchUsers);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{
        field: keyof userState['filters'];
        value: string;
      }>,
    ) {
      state.filters[action.payload.field] = action.payload.value;
    },
    clearFilter(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.error('Failed to fetch users:', action.error);
      });
  },
});

export const { setFilter, clearFilter } = userSlice.actions;

export default userSlice.reducer;
