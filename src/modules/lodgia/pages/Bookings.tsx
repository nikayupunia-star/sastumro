import { useSelector } from 'react-redux';
import type { RootState } from '../types';
import BookingCard from '../components/BookingCard';
import BookingForm from '../components/BookingForm';

export default function Bookings() {
  const list = useSelector((s: RootState) => s.bookings);
  return (
    <main className="wrap page">
      <header className="head">
        <h1>პაკეტები</h1>
        <p>{list.length} აქტიური ბარათი. აირჩიე ერთ-ერთი დეტალების სანახავად ან დაამატე ახალი.</p>
      </header>
      <div className="split">
        <section className="grid">
          {list.map((b) => <BookingCard key={b.id} b={b} />)}
          {list.length === 0 && <p className="empty">პაკეტები ჯერ არ არის. შეავსე ფორმა და დაამატე პირველი.</p>}
        </section>
        <aside className="panel">
          <h2>ახალი პაკეტი</h2>
          <BookingForm />
        </aside>
      </div>
    </main>
  );
}
