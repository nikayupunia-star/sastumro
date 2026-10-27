import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeBooking, total, NIGHT_PRICE } from '../bookingsSlice';
import type { AppDispatch, RootState } from '../types';
import BookingCard from '../components/BookingCard';
import BookingForm from '../components/BookingForm';
import { p } from '../routes';

export default function BookingDetails() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const b = useSelector((s: RootState) => s.bookings.find((x) => x.id === bookingId));
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  if (!b)
    return (
      <main className="wrap page center">
        <h1>პაკეტი ვერ მოიძებნა</h1>
        <p>ბმული ძველია ან პაკეტი წაშლილია.</p>
        <Link className="btn gold" to={p('/bookings')}>პაკეტების სიაში დაბრუნება</Link>
      </main>
    );

  return (
    <main className="wrap page">
      <Link to={p('/bookings')} className="back">‹ ყველა პაკეტი</Link>
      <div className="detail">
        <BookingCard b={b} className="big" />
        <div>
          <h1>{b.name}</h1>
          <dl className="facts">
            <div><dt>ღამეები</dt><dd>{b.nights}</dd></div>
            <div><dt>ფასი ღამეზე</dt><dd>${NIGHT_PRICE}</dd></div>
            <div><dt>სულ</dt><dd>${total(b.nights)}</dd></div>
            <div><dt>ელ-ფოსტა</dt><dd className="sm">{b.email}</dd></div>
          </dl>
          <div className="panel">
            <h2>პაკეტის რედაქტირება</h2>
            <BookingForm booking={b} />
          </div>
          <button className="btn ghost" onClick={() => { dispatch(removeBooking(b.id)); nav(p('/bookings')); }}>
            პაკეტის წაშლა
          </button>
        </div>
      </div>
    </main>
  );
}
