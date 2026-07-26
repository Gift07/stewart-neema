import { useEffect, useRef, useState } from 'react';

type Props = {
  src?: string;
};

export function MusicToggle({ src = '/wedding-music.mp3' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'none';
    audioRef.current = audio;

    const onError = () => setAvailable(false);
    audio.addEventListener('error', onError);
    return () => {
      audio.pause();
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, [src]);

  if (!available) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full bg-olive text-white shadow-[0_10px_28px_rgba(58,47,40,0.28)] transition hover:bg-[#4f5d3b] sm:bottom-8 sm:right-8 sm:size-14"
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Tap for music'}
    >
      {playing ? (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19V6l12-3v13M9 19c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2Zm12-3c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2ZM9 10l12-3"
          />
        </svg>
      )}
    </button>
  );
}
