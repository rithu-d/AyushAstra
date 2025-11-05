import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AyushAstra - Your Holistic Wellness Guide',
  description: 'Discover the ancient wisdom of Ayurveda and Yoga. Find personalized recommendations for yoga poses, Ayurvedic remedies, and breathing exercises tailored to your wellness needs.',
  keywords: 'Ayurveda, Yoga, Wellness, Health, Pranayama, Holistic Medicine, Natural Remedies',
  authors: [{ name: 'AyushAstra Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
