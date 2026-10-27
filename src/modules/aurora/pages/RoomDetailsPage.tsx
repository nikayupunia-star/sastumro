import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useAppSelector } from "../app/hooks";
import { p } from "../routes";

const today = () => new Date().toISOString().split("T")[0];

export default function RoomDetailsPage() {
  // დინამიური მარშუტი: /rooms/:roomId
  const { roomId } = useParams<{ roomId: string }>();
  const room = useAppSelector((s) => s.rooms.find((r) => r.id === roomId));

  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  if (!room) {
    return (
      <PageTransition>
        <div className="empty">
          <h2>ოთახი ვერ მოიძებნა 😕</h2>
          <Link to={p("/rooms")} className="btn">← კატალოგში დაბრუნება</Link>
        </div>
      </PageTransition>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000))
      : 0;
  const total = nights * room.price;
  const canBook = nights > 0 && guests >= 1 && guests <= room.capacity;

  const handleBook = () => {
    if (!canBook) return;
    setBooked(true);
    setTimeout(() => setBooked(false), 4000);
  };

  return (
    <PageTransition>
      <Link to={p("/rooms")} className="link back">← ყველა ნომერი</Link>

      <div className="details">
        <motion.div
          className="details-img"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={room.image} alt={room.name} />
        </motion.div>

        <motion.div
          className="details-info"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1>{room.name}</h1>
          <div className="meta">
            <span className="chip">💵 ${room.price} / ღამე</span>
            <span className="chip">👥 მაქს. {room.capacity} სტუმარი</span>
            <span className="chip">🆔 #{room.id.slice(0, 6)}</span>
          </div>
          <p className="desc">{room.description || "აღწერა არ არის მითითებული."}</p>

          <div className="booking">
            <h3>დაჯავშნე ახლავე</h3>
            <div className="booking-grid">
              <label>
                შესვლა
                <input type="date" className="input" min={today()} value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label>
                გასვლა
                <input type="date" className="input" min={checkIn || today()} value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)} />
              </label>
              <label>
                სტუმრები
                <input type="number" className="input" min={1} max={room.capacity} value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))} />
              </label>
            </div>

            <div className="total">
              <span>{nights} ღამე × ${room.price}</span>
              <strong>${total}</strong>
            </div>

            <motion.button
              className="btn btn-block"
              disabled={!canBook}
              onClick={handleBook}
              whileHover={canBook ? { scale: 1.02 } : {}}
              whileTap={canBook ? { scale: 0.97 } : {}}
            >
              დაჯავშნა
            </motion.button>

            <AnimatePresence>
              {booked && (
                <motion.div
                  className="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✅ ჯავშანი წარმატებით გაფორმდა! ჯამი: ${total}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
