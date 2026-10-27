import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './types';
import BookingCard from './components/BookingCard';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import { p } from './routes';

function Home() {
  const all = useSelector((s: RootState) => s.bookings);
  const list = all.slice(0, 3);
  return (
    <main className="wrap hero">
      <div className="copy">
        <h1>დასვენება იწყება ერთი ბარათით</h1>
        <p>შექმენი სასტუმროს პაკეტი, აირჩიე ღამეები და მიიღე ბარათი, რომელიც შენს მგზავრობას ხსნის.</p>
        <div className="cta">
          <Link to={p('/bookings')} className="btn gold">პაკეტების ნახვა</Link>
          <Link to={p('/bookings')} className="btn ghost">ახალი პაკეტის შექმნა</Link>
        </div>
      </div>
      <div className="fan">
        {list.map((b, i) => <BookingCard key={b.id} b={b} style={{ animationDelay: `${i * 140}ms` }} />)}
      </div>
    </main>
  );
}

export default function LodgiaApp() {
  const count = useSelector((s: RootState) => s.bookings.length);
  return (
    <div className="lodgia-root">
      <nav className="nav wrap">
        <Link to={p('/')} className="logo">Lodgia</Link>
        <div>
          <NavLink to={p('/')} end>მთავარი</NavLink>
          <NavLink to={p('/bookings')}>პაკეტები <i>{count}</i></NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:bookingId" element={<BookingDetails />} />
        <Route path="*" element={<Navigate to={p('/')} replace />} />
      </Routes>
      <footer className="wrap foot">Lodgia · სასტუმროს დაჯავშნის პლატფორმა</footer>
    </div>
  );
}
