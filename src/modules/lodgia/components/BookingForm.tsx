import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBooking, updateBooking, type Booking } from '../bookingsSlice';
import type { AppDispatch } from '../types';

const schema = Yup.object({
  name: Yup.string().trim().required('სტრუქტურის სახელი სავალდებულოა'),
  nights: Yup.number()
    .typeError('შეიყვანეთ რიცხვი')
    .min(1, 'მინიმუმ 1 ღამე')
    .max(30, 'მაქსიმუმ 30 ღამე')
    .required('ღამეების რაოდენობა სავალდებულოა'),
  email: Yup.string().email('ჩაწერეთ სწორი ელ-ფოსტა').required('ელ-ფოსტა სავალდებულოა'),
});

type Key = 'name' | 'nights' | 'email';

export default function BookingForm({ booking, onDone }: { booking?: Booking; onDone?: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const f = useFormik({
    initialValues: { name: booking?.name ?? '', nights: booking?.nights ?? 1, email: booking?.email ?? '' },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (v, { resetForm }) => {
      if (booking) dispatch(updateBooking({ id: booking.id, ...v }));
      else { dispatch(addBooking(v)); resetForm(); }
      onDone?.();
    },
  });

  const field = (k: Key, label: string, type = 'text', ph = '') => {
    const err = f.touched[k] && f.errors[k];
    return (
      <label className={`fld${err ? ' bad' : ''}`}>
        <span>{label}</span>
        <input type={type} placeholder={ph} {...f.getFieldProps(k)} />
        {err && <em>{f.errors[k]}</em>}
      </label>
    );
  };

  return (
    <form onSubmit={f.handleSubmit} noValidate>
      {field('name', 'სტრუქტურის სახელი', 'text', 'მაგ. Aurora Grand Hotel')}
      {field('nights', 'ღამეების რაოდენობა (1–30)', 'number', '1')}
      {field('email', 'ელ-ფოსტა', 'email', 'name@example.com')}
      <div className="sum">
        <span>სავარაუდო ღირებულება</span>
        <b>${(Number(f.values.nights) || 0) * 180}</b>
      </div>
      <button type="submit" className="btn gold" disabled={f.isSubmitting}>
        {booking ? 'ცვლილებების შენახვა' : 'პაკეტის დამატება'}
      </button>
    </form>
  );
}
