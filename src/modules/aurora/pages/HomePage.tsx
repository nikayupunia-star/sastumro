import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import RoomCard from "../components/RoomCard";
import { useAppSelector } from "../app/hooks";
import { p } from "../routes";

const features = [
  { icon: "🛏️", title: "კომფორტული ნომრები", text: "ყველა ბიუჯეტისა და სტუმრის რაოდენობისთვის." },
  { icon: "⚡", title: "სწრაფი ჯავშანი", text: "აირჩიეთ ოთახი და დაჯავშნეთ რამდენიმე წამში." },
  { icon: "🌟", title: "პრემიუმ სერვისი", text: "24/7 მხარდაჭერა და უფასო საუზმე." },
];

export default function HomePage() {
  const rooms = useAppSelector((s) => s.rooms);

  return (
    <PageTransition>
      <section className="hero">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          ✦ მოგესალმებით Aurora Hotels-ში
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          იპოვეთ იდეალური <em>ნომერი</em> თქვენი დასვენებისთვის
        </motion.h1>
        <motion.p
          className="lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          დაათვალიერეთ ჩვენი ნომრების კატალოგი, გაეცანით დეტალებს და დაჯავშნეთ
          რამდენიმე კლიკით.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to={p("/rooms")} className="btn">ნომრების ნახვა</Link>
          <Link to={p("/add-room")} className="btn btn-ghost">ოთახის დამატება</Link>
        </motion.div>
      </section>

      <section className="features">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p className="muted">{f.text}</p>
          </motion.div>
        ))}
      </section>

      <section>
        <div className="section-head">
          <h2>პოპულარული ნომრები</h2>
          <Link to={p("/rooms")} className="link">ყველას ნახვა →</Link>
        </div>
        <div className="grid">
          {rooms.slice(0, 3).map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
