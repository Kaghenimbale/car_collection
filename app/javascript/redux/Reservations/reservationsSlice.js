import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "axios";

const API_URL = '/api/v1/reservations';

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        // Handle non-2xx HTTP response status
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch reservations');
    }
  },
);

const baseReservationUrl = 'http://127.0.0.1:3000/api/v1/reservations';

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData, thunkAPI) => {
    try {
      const response = await fetch(baseReservationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  reservations: [],
  isLoading: true,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        reservations: action.payload,
      }))
      .addCase(fetchReservations.rejected, (state) => ({
        ...state,
        isLoading: false, // Should be false, not true
      }))
      .addCase(createReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createReservation.fulfilled, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(createReservation.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default reservationsSlice.reducer;
