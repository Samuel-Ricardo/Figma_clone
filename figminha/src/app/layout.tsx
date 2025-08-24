import type { Metadata } from 'next';
import './globals.css';
import { LiveblocksRoomProvider } from '@/provider/liveblocks/room.provider';

export const metadata: Metadata = {
  title: 'Figminha 🎨',
  description: 'The little Figma of Liminha! : D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-primary-gray-200`}>
        <LiveblocksRoomProvider>{children}</LiveblocksRoomProvider>
      </body>
    </html>
  );
}
