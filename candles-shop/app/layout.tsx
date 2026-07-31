// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Candles', path: '/candles' },
    { name: 'Scents', path: '/scents' },
    { name: 'Sizes', path: '/sizes' },
    { name: 'Customers', path: '/customers' },
    { name: 'Employees', path: '/employees' },
    { name: 'Sales', path: '/sales' },
    { name: 'Sales Items', path: '/sales-items' },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', padding: '20px' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          {navLinks.map((link, idx) => (
            <span key={link.path}>
              <Link href={link.path}>{link.name}</Link>
              {idx < navLinks.length - 1 && ' | '}
            </span>
          ))}
        </nav>
        {children}
      </body>
    </html>
  );
}