type TimelineItem = {
  time: string;
  title: string;
  detail: string;
};

type Props = {
  items: TimelineItem[];
};

export function DayTimeline({ items }: Props) {
  return (
    <section className="relative z-10 w-full bg-[#eef2e8] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center sm:mb-12">
          <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-olive-soft sm:text-[0.9rem]">
            Timeline
          </p>
          <h2 className="mt-3 mb-0 font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-[2.35rem] md:text-[2.6rem]">
            Every moment,
            <br />
            beautifully placed
          </h2>
        </header>

        <div className="relative mx-auto max-w-xl rounded-[24px] border border-ink/5 bg-[#fcfdfb] px-5 py-8 shadow-[0_18px_40px_rgba(58,47,40,0.08)] sm:px-8 sm:py-10 md:px-10">
          <div
            className="absolute bottom-10 top-10 left-[5.35rem] w-px bg-[#c8d1c0] sm:left-[6.35rem] md:left-[7.1rem]"
            aria-hidden
          />

          <ol className="relative m-0 grid list-none grid-cols-[4.5rem_1rem_1fr] gap-x-4 gap-y-10 p-0 sm:grid-cols-[5.5rem_1rem_1fr] sm:gap-x-6 md:grid-cols-[6.25rem_1rem_1fr]">
            {items.map((item) => (
              <li key={item.title} className="contents">
                <p className="m-0 pt-0.5 text-right text-[0.8rem] font-bold uppercase tracking-[0.16em] text-olive-soft sm:text-[0.95rem]">
                  {item.time}
                </p>
                <div className="relative z-[1] flex justify-center pt-1.5">
                  <span className="size-3.5 rounded-full border-[3px] border-olive-soft bg-[#fcfdfb] shadow-sm sm:size-4" />
                </div>
                <div>
                  <h3 className="m-0 font-serif text-[1.35rem] font-medium leading-tight text-ink sm:text-[1.55rem] md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 mb-0 text-[0.92rem] leading-relaxed text-muted sm:text-[1rem]">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
