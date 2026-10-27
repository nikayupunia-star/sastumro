import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Room } from "../features/rooms/roomsSlice";
import { p } from "../routes";

export default function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.article
      className="card"
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.6) }}
      whileHover={{ y: -8 }}
    >
      <div className="card-img">
        <img src={room.image} alt={room.name} loading="lazy" />
        <span className="price-tag">${room.price}<small> / ღამე</small></span>
      </div>
      <div className="card-body">
        <h3>{room.name}</h3>
        <p className="muted clamp">{room.description || "აღწერა არ არის მითითებული."}</p>
        <div className="card-footer">
          <span className="chip">👥 {room.capacity} სტუმარი</span>
          {/* Link-ით გადასვლა ოთახის დეტალებზე */}
          <Link to={p(`/rooms/${room.id}`)} className="btn btn-small">
            დეტალები →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
