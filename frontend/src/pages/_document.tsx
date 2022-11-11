import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='bg-gradient-to-t from-slate-900 via-slate-600 to-slate-900 min-h-screen'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
