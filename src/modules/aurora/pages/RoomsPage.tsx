import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import RoomCard from "../components/RoomCard";
import { useAppSelector } from "../app/hooks";
import { p } from "../routes";

type Sort = "new" | "cheap" | "expensive";

export default function RoomsPage() {
  // useSelector-ით ოთახების გამოტანა
  const rooms = useAppSelector((s) => s.rooms);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("new");

  const visible = useMemo(() => {
    const filtered = rooms.filter((r) =>
      r.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === "cheap") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "expensive") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [rooms, query, sort]);

  return (
    <PageTransition>
      <div className="section-head">
        <div>
          <h1 className="page-title">ნომრების კატალოგი</h1>
          <p className="muted">სულ {rooms.length} ნომერი · ნაჩვენებია {visible.length}</p>
        </div>
        <Link to={p("/add-room")} className="btn">+ ახალი ოთახი</Link>
      </div>

      <div className="toolbar">
        <input
          className="input"
          placeholder="🔍 მოძებნე ნომერი..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="new">ახალი პირველი</option>
          <option value="cheap">ფასი: იაფიდან ძვირისკენ</option>
          <option value="expensive">ფასი: ძვირიდან იაფისკენ</option>
        </select>
      </div>

      <motion.div className="grid" layout>
        <AnimatePresence>
          {visible.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && <p className="empty">ნომერი ვერ მოიძებნა 😕</p>}
    </PageTransition>
  );
}
