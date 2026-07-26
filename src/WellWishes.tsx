import { useMemo, useState, type FormEvent } from 'react';

type Wish = {
  name: string;
  message: string;
  at: number;
};

type Props = {
  storageKey: string;
  coupleLabel: string;
};

function loadWishes(key: string): Wish[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Wish[];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function WellWishes({ storageKey, coupleLabel }: Props) {
  const key = `wishes:${storageKey}`;
  const [wishes, setWishes] = useState<Wish[]>(() =>
    typeof window === 'undefined' ? [] : loadWishes(key),
  );
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const recent = useMemo(() => wishes.slice(0, 4), [wishes]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Wish = {
      name: name.trim() || 'A guest',
      message: message.trim(),
      at: Date.now(),
    };
    if (!next.message) return;
    const updated = [next, ...wishes].slice(0, 8);
    setWishes(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setName('');
    setMessage('');
    setSent(true);
  };

  return (
    <section className="relative z-10 w-full px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-olive-soft sm:text-[0.9rem]">
            Well wishes
          </p>
          <h2 className="mt-3 mb-0 font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
            Leave a note for {coupleLabel}
          </h2>
        </header>

        <form
          onSubmit={onSubmit}
          className="rounded-[20px] border border-ink/8 bg-white/90 p-5 shadow-[0_16px_36px_rgba(58,47,40,0.08)] sm:p-7"
        >
          <label className="block">
            <span className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-muted">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink/12 bg-cream/60 px-3.5 py-3 font-serif text-[1.05rem] text-ink outline-none focus:border-olive/40"
              placeholder="Full name"
              autoComplete="name"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-muted">Message</span>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSent(false);
              }}
              rows={4}
              required
              className="mt-2 w-full resize-y rounded-xl border border-ink/12 bg-cream/60 px-3.5 py-3 font-serif text-[1.05rem] leading-relaxed text-ink outline-none focus:border-olive/40"
              placeholder="Share your blessing…"
            />
          </label>
          <button
            type="submit"
            className="mt-5 w-full cursor-pointer rounded-full bg-olive px-6 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#4f5d3b]"
          >
            Send wishes
          </button>
          {sent ? (
            <p className="mt-3 mb-0 text-center font-serif text-[1.05rem] italic text-olive-soft">
              Wishes received — thank you.
            </p>
          ) : null}
        </form>

        {recent.length > 0 ? (
          <ul className="mt-8 m-0 list-none space-y-3 p-0">
            {recent.map((wish) => (
              <li
                key={`${wish.at}-${wish.name}`}
                className="rounded-2xl border border-ink/6 bg-white/70 px-4 py-3.5"
              >
                <p className="m-0 font-serif text-[1.05rem] leading-relaxed text-ink">“{wish.message}”</p>
                <p className="mt-2 mb-0 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  — {wish.name}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
