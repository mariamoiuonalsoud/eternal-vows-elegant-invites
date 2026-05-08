import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const TRACK = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"; // calm acoustic oriental

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => {
      a.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-4 right-4 z-50 h-11 w-11 rounded-full bg-card/80 backdrop-blur border border-border shadow-md flex items-center justify-center text-[var(--primary)] hover:bg-card transition-all"
    >
      {playing ? <VolumeX size={18} /> : <Music size={18} />}
    </button>
  );
}
