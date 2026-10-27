import type { Dispatch } from '@reduxjs/toolkit';
import type { Booking } from './bookingsSlice';

// Lodgia-ს state-ის ნაწილი საერთო store-ში (key: "bookings")
export type RootState = { bookings: Booking[] };
export type AppDispatch = Dispatch;
