import { AuthContextProvider } from '@/app/context/authContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider, rootStore } from '@/app/store/root.store';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Story Time',
  description: 'Get your kids to sleep with a personalized story',
}
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}
export default function RootLayout({
  children, params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <AuthContextProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
