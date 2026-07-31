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

  return (
    <main>
      <h1>Candles Shop POS - Database Management Portal</h1>
      <p>CS 340 Project Step 3 Draft - UI Interface Navigation</p>
      <ul>
        {entities.map((item) => (
          <li key={item.path} style={{ marginBottom: '10px' }}>
            <Link href={item.path}><strong>{item.name} Page</strong></Link>
            <p style={{ margin: '2px 0 0 0' }}>{item.desc}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}