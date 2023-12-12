export default function LocalePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="mt-2">
      <h2>Page</h2>
      <div>{locale}</div>
    </div>
  )
}
