const COLOURS = [
  { name: 'Sage', hex: '#a8b59c' },
  { name: 'Eucalyptus', hex: '#6a7870' },
  { name: 'Champagne', hex: '#e5dacb' },
  { name: 'Gold', hex: '#c4a574' },
  { name: 'Ivory', hex: '#f7f4ef' },
] as const;

export function DressColours() {
  return (
    <section className="relative z-10 w-full bg-white/55 px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-olive-soft sm:text-[0.92rem]">
          Dress code
        </p>
        <h2 className="mt-3 mb-0 font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-[2.35rem] md:text-[2.6rem]">
          Wedding colours
        </h2>
        <p className="mx-auto mt-3 mb-0 max-w-md font-serif text-[1.1rem] italic leading-relaxed text-muted sm:text-[1.2rem]">
          Soft sage, eucalyptus greens, champagne, and warm gold.
        </p>

        <div className="mt-10 flex flex-wrap items-end justify-center gap-5 sm:gap-7 md:gap-8">
          {COLOURS.map((colour) => (
            <div key={colour.name} className="flex w-[4.75rem] flex-col items-center sm:w-[5.5rem]">
              <div
                className="size-16 rounded-full border-2 border-white shadow-[0_8px_20px_rgba(58,47,40,0.14)] sm:size-[4.5rem] md:size-20"
                style={{ backgroundColor: colour.hex }}
                aria-hidden
              />
              <p className="mt-3 mb-0 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-ink/85 sm:text-[0.88rem]">
                {colour.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
