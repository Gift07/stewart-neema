import { useMemo, useState } from 'react';

type Question = {
  prompt: string;
  options: string[];
  answer: number;
};

const QUESTIONS: Question[] = [
  {
    prompt: 'Where is the wedding ceremony held?',
    options: ['Banora Hall', "Kingdom Hall, Kunduchi", 'Garden Chapel', 'Ukumbini'],
    answer: 1,
  },
  {
    prompt: 'What time does the ceremony begin?',
    options: ['12:00', '13:00', '16:00', '17:00'],
    answer: 1,
  },
  {
    prompt: 'Where is the reception (Ukumbini)?',
    options: ["Kingdom Hall, Kunduchi", 'Banora Hall', 'Chelsea', 'Notting Hill'],
    answer: 1,
  },
];

export function CoupleTrivia() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = QUESTIONS[index];
  const badge = useMemo(() => {
    if (score === QUESTIONS.length) return 'Couple experts';
    if (score >= 2) return 'Close friends';
    return 'Warm well-wishers';
  }, [score]);

  const pick = (optionIndex: number) => {
    const nextScore = score + (optionIndex === question.answer ? 1 : 0);
    if (index + 1 >= QUESTIONS.length) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex(index + 1);
  };

  const reset = () => {
    setStarted(false);
    setIndex(0);
    setScore(0);
    setDone(false);
  };

  return (
    <section className="relative z-10 w-full bg-[#e8d5c0]/55 px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-olive-soft sm:text-[0.9rem]">
          A little surprise
        </p>
        <h2 className="mt-3 mb-0 font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
          How well do you know the couple?
        </h2>

        <div className="mt-8 rounded-[20px] border border-ink/8 bg-white/90 px-5 py-7 text-left shadow-[0_16px_36px_rgba(58,47,40,0.08)] sm:px-7 sm:py-8">
          {!started ? (
            <div className="text-center">
              <p className="m-0 font-serif text-[1.1rem] leading-relaxed text-muted">
                Three quick questions — just for fun before the big day.
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-6 cursor-pointer rounded-full bg-olive px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#4f5d3b]"
              >
                Play
              </button>
            </div>
          ) : done ? (
            <div className="text-center">
              <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.2em] text-olive-soft">
                Your score
              </p>
              <p className="mt-2 mb-0 font-serif text-[2.4rem] leading-none text-ink">
                {score}/{QUESTIONS.length}
              </p>
              <p className="mt-3 mb-0 font-script text-[2rem] text-ink">{badge}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 cursor-pointer rounded-full border border-ink/15 bg-transparent px-6 py-3 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-cream"
              >
                Play again
              </button>
            </div>
          ) : (
            <div>
              <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-muted">
                Question {index + 1} of {QUESTIONS.length}
              </p>
              <p className="mt-3 mb-5 font-serif text-[1.25rem] leading-snug text-ink sm:text-[1.4rem]">
                {question.prompt}
              </p>
              <div className="flex flex-col gap-2.5">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(optionIndex)}
                    className="cursor-pointer rounded-xl border border-ink/12 bg-cream/70 px-4 py-3 text-left font-serif text-[1.05rem] text-ink transition hover:border-olive/35 hover:bg-sage/40"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
