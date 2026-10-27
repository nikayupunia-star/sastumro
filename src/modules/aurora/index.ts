import type { SiteModule } from '../../shared/types';
import AuroraApp from './AuroraApp';
import rooms from './features/rooms/roomsSlice';
import { BASE } from './routes';
import './aurora.css';

const site: SiteModule = {
  id: 'aurora',
  title: 'Aurora Hotels',
  description: 'ნომრების კატალოგი, ძებნა, დეტალები, ჯავშნის გაანგარიშება და ახალი ოთახის დამატება.',
  emoji: '✦',
  path: BASE,
  reducers: { rooms },
  Component: AuroraApp,
};
export default site;
