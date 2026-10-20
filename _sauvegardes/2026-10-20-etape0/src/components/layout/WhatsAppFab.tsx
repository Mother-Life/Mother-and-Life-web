export function WhatsAppFab({ phone }: { phone: string }) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_16px_rgba(0,0,0,0.2)] print:hidden"
      aria-label="Nous écrire sur WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 32 32" className="h-[30px] w-[30px] fill-white" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22c-1.2 0-2.4-.3-3.5-.8l-.7-.4-4.9 1 1-4.7-.4-.7C6.5 18 6 16.5 6 15 6 9.5 10.5 5 16 5s10 4.5 10 10-4.5 10-10 10z" />
      </svg>
    </a>
  )
}
