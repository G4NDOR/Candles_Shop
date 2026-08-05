import StoreProvider from './StoreProvider';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f4f4f9' }}>
        <Navbar />
        <StoreProvider>
          <LoadingSpinner />
          <Notification />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}