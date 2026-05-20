import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-ink-950 px-6 text-center">
      <div className="max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 h-display text-4xl font-semibold text-white sm:text-5xl">
          Stránka nenalezena
        </h1>
        <p className="mt-3 text-white/65">
          Tato stránka neexistuje. Zkuste se vrátit na hlavní stranu nebo na menu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Domů
          </Link>
          <Link href="/menu" className="btn-ghost">
            Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
