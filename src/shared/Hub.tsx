import { Link } from 'react-router-dom';
import { modules } from './registry';

export default function Hub() {
  return (
    <main className="hub">
      <h1>სასტუმროს პლატფორმა</h1>
      <p>აირჩიე საიტი</p>
      <div className="hub-grid">
        {modules.map((m) => (
          <Link key={m.id} to={m.path} className="hub-card">
            <span className="hub-ico">{m.emoji}</span>
            <h2>{m.title}</h2>
            <p>{m.description}</p>
            <b>გახსნა →</b>
          </Link>
        ))}
      </div>
    </main>
  );
}
