import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  id: string;
  name: string;
  price: number; // ფასი ღამეში
  capacity: number;
  description: string;
  image: string;
}

export type NewRoom = Omit<Room, "id">;

const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/650`;

const initialState: Room[] = [
  {
    id: "1",
    name: "დელუქს სუიტი ზღვის ხედით",
    price: 280,
    capacity: 4,
    description:
      "ფართო სუიტი პანორამული ფანჯრებით, პირადი აივნით, ჯაკუზითა და უფასო საუზმით. იდეალურია ოჯახისთვის ან რომანტიკული დასვენებისთვის.",
    image: img("aurora-suite"),
  },
  {
    id: "2",
    name: "სტანდარტული ორადგილიანი",
    price: 95,
    capacity: 2,
    description:
      "მყუდრო და კომფორტული ოთახი ორი სტუმრისთვის: King-size საწოლი, სწრაფი Wi-Fi, კონდიციონერი და თანამედროვე აბაზანა.",
    image: img("aurora-standard"),
  },
  {
    id: "3",
    name: "ოჯახური აპარტამენტი",
    price: 190,
    capacity: 6,
    description:
      "ორი საძინებელი, მისაღები და მინი-სამზარეულო. ბავშვებისთვის განკუთვნილი სივრცე და უსაფრთხო გარემო.",
    image: img("aurora-family"),
  },
  {
    id: "4",
    name: "ბიზნეს ოთახი",
    price: 130,
    capacity: 2,
    description:
      "სამუშაო მაგიდა, ერგონომიული სკამი, სწრაფი ინტერნეტი და ყავის აპარატი — ყველაფერი პროდუქტიული დღისთვის.",
    image: img("aurora-business"),
  },
  {
    id: "5",
    name: "პრემიუმ პენტჰაუსი",
    price: 520,
    capacity: 8,
    description:
      "სასტუმროს ყველაზე ექსკლუზიური ნომერი ტერასით, პირადი ბარითა და კონსიერჟ-სერვისით 24/7.",
    image: img("aurora-penthouse"),
  },
];

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: {
      reducer(state, action: PayloadAction<Room>) {
        state.unshift(action.payload);
      },
      prepare(room: NewRoom) {
        return {
          payload: {
            ...room,
            id: nanoid(),
            image: room.image.trim() || img(`room-${nanoid(6)}`),
          } as Room,
        };
      },
    },
  },
});

export const { addRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
