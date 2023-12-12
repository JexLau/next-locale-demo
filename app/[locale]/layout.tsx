
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  console.log('locale', params)
  return (
    <html lang={params.locale}>
      <div>
        <h1>Root Layout</h1>
        {children}
      </div>
   </html>
  )
}
