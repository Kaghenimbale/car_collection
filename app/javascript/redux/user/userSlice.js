import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://127.0.0.1:3000/registrations';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (initialUser) => {
    try {
      const res = await axios.post(
        url,
        {
          user: {
            ...initialUser,
          },
        },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (initialUser) => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:3000/session',
        {
          user: {
            ...initialUser,
          },
        },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const res = await axios.delete('http://127.0.0.1:3000/logout', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  user: {},
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => ({
        ...state,
      }))
      .addCase(createUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
      }))
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }))
      .addCase(loginUser.pending, (state) => ({
        ...state,
      }))
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('login', true);
        localStorage.setItem(
          'current_user_id',
          JSON.stringify(action.payload.user.id),
        );
        return {
          ...state,
          user: action.payload,
          loggedIn: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }))
      .addCase(logoutUser.pending, (state) => ({
        ...state,
      }))
      .addCase(logoutUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        loggedIn: false,
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }));
  },
});

export default userSlice.reducer;
