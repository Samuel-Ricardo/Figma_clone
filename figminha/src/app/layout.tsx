import '@liveblocks/react-comments/styles.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.scss';
import { LiveblocksRoomProvider } from '@/provider/liveblocks/room.provider';
import { ThemeProvider } from '@/provider/theme/theme.provider';

export const metadata: Metadata = {
  title: 'Figminha 🎨',
  description: 'The little Figma of Liminha! : D',
};

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        <ThemeProvider />
        <LiveblocksRoomProvider>{children}</LiveblocksRoomProvider>
      </body>
    </html>
  );
}
