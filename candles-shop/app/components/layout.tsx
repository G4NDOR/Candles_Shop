'use client';

import { Provider } from 'react-redux';
import { store } from '../store'; // This should be the single source of truth for the store
import Navbar from './Navbar';
import LoadingSpinner from './LoadingSpinner';
import Notification from './Notification';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <LoadingSpinner />
      <Notification />
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </Provider>
  )
}