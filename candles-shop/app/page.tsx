// app/page.jsx
import Link from 'next/link';

export default function HomePage() {
  const entities = [
    { name: 'Candles', path: '/candles', desc: 'Browse, create, update, and delete candle inventory.' },
    { name: 'Scents', path: '/scents', desc: 'Manage candle scent descriptions and details.' },
    { name: 'Sizes', path: '/sizes', desc: 'Manage candle size categories and fluid volume.' },
    { name: 'Customers', path: '/customers', desc: 'View customer accounts and contact information.' },
    { name: 'Employees', path: '/employees', desc: 'Manage shop staff profiles and employment status.' },
    { name: 'Sales', path: '/sales', desc: 'Track sales orders, dates, customer links, and order totals.' },
    { name: 'Sales Items', path: '/sales-items', desc: 'Manage line items connecting sales transactions to candles.' },
  ];

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
        {entities.map((item) => (
          <Link href={item.path} key={item.path} style={cardStyle} className="nav-card"><h2>{item.name} &rarr;</h2><p>{item.desc}</p></Link>
        ))}
      </div>
    </div>
  );
}