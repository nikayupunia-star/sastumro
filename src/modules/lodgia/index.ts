import type { SiteModule } from '../../shared/types';
import LodgiaApp from './LodgiaApp';
import bookings from './bookingsSlice';
import { BASE } from './routes';
import './lodgia.css';

const site: SiteModule = {
  id: 'lodgia',
  title: 'Lodgia',
  description: 'სასტუმროს პაკეტები ბარათების სახით: დამატება, რედაქტირება და წაშლა.',
  emoji: '🗝️',
  path: BASE,
  reducers: { bookings },
  Component: LodgiaApp,
};
export default site;
