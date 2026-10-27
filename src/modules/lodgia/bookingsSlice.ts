import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export interface Booking { id: string; name: string; nights: number; email: string; theme: number }
export type BookingInput = Omit<Booking, 'id' | 'theme'>;

export const NIGHT_PRICE = 180;
export const total = (nights: number) => nights * NIGHT_PRICE;

const initialState: Booking[] = [
  { id: 'b1', name: 'Aurora Grand Hotel', nights: 5, email: 'aurora@lodgia.ge', theme: 0 },
  { id: 'b2', name: 'Caucasus Sky Resort', nights: 7, email: 'sky@lodgia.ge', theme: 1 },
  { id: 'b3', name: 'Kakheti Wine Villa', nights: 3, email: 'villa@lodgia.ge', theme: 2 },
  { id: 'b4', name: 'Black Sea Pearl', nights: 10, email: 'pearl@lodgia.ge', theme: 3 },
];

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: {
      reducer: (state, action: PayloadAction<Booking>) => { state.unshift(action.payload); },
      prepare: (v: BookingInput) => ({ payload: { ...v, id: nanoid(6), theme: Math.floor(Math.random() * 4) } }),
    },
    updateBooking: (state, action: PayloadAction<BookingInput & { id: string }>) => {
      const i = state.findIndex((b) => b.id === action.payload.id);
      if (i > -1) state[i] = { ...state[i], ...action.payload };
    },
    removeBooking: (state, action: PayloadAction<string>) => state.filter((b) => b.id !== action.payload),
  },
});

export const { addBooking, updateBooking, removeBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
