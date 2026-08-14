// app/page.jsx
import Link from 'next/link';
import { NAV_ITEMS } from './schemaRegistry';

export default function HomePage() {

  const containerStyle: React.CSSProperties = {
    maxWidth: '960px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '1rem',
    marginBottom: '2rem',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Database Management Portal</h1>
        <p style={{ color: '#555' }}>Select an entity below to view, add, or edit its data.</p>
      </div>
      <div style={gridStyle}>
        {NAV_ITEMS.map((item) => (
          <Link href={item.path} key={item.path} style={cardStyle} className="nav-card">
            <h2>{item.displayName} &rarr;</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}