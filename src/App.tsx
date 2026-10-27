import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Hub from './shared/Hub';
import { modules } from './shared/registry';

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Hub />} />
        {modules.map((m) => (
          <Route key={m.id} path={`${m.path}/*`} element={<m.Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {pathname !== '/' && <Link to="/" className="hub-back">⌂ ყველა საიტი</Link>}
    </>
  );
}
