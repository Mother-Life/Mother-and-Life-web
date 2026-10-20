export default function PageLoading() {
  return (
    <div
      className="mx-auto min-h-[65vh] max-w-[1200px] px-6 py-14 md:px-12 md:py-20"
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
    >
      <div className="h-3 w-28 animate-pulse rounded-full bg-rose-050" />
      <div className="mt-5 h-12 max-w-xl animate-pulse rounded-[8px] bg-gris-100" />
      <div className="mt-4 h-5 max-w-2xl animate-pulse rounded-[6px] bg-gris-100" />
      <div className="mt-2 h-5 max-w-lg animate-pulse rounded-[6px] bg-gris-100" />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-56 animate-pulse rounded-[12px] border border-hairline bg-gris-100"
          />
        ))}
      </div>
      <span className="sr-only">Chargement...</span>
    </div>
  )
}
