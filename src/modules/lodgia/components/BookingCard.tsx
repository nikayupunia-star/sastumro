import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { total, type Booking } from '../bookingsSlice';
import { p } from '../routes';

export const ICONS = ['🏛️', '🏔️', '🍇', '🌊'];

export default function BookingCard({ b, className = '', style }: { b: Booking; className?: string; style?: CSSProperties }) {
  return (
    <Link to={p(`/bookings/${b.id}`)} className={`key t${b.theme} ${className}`} style={style}>
      <span className="hole" />
      <span className="ico">{ICONS[b.theme % 4]}</span>
      <div className="kb">
        <h3>{b.name}</h3>
        <p>{b.email}</p>
      </div>
      <div className="kf">
        <b>{b.nights}</b>
        <small>ღამე</small>
        <strong>${total(b.nights)}</strong>
      </div>
    </Link>
  );
}
