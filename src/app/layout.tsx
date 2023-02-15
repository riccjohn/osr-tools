import localFont from '@next/font/local';
import './globals.css'

const sebaldusGotisch = localFont({
  src: './fonts/Sebaldus-Gotisch.woff2',
  display: 'swap',
  variable: '--font-sebaldusGotisch',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={sebaldusGotisch.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="container mx-auto flex flex-col bg-white dark:bg-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
