import type { Dispatch } from "@reduxjs/toolkit";
import type { Room } from "../features/rooms/roomsSlice";

// Aurora-ს state-ის ნაწილი საერთო store-ში (key: "rooms")
export type RootState = { rooms: Room[] };
export type AppDispatch = Dispatch;
