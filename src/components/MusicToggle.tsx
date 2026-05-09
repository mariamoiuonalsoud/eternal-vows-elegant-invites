import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

import weddingMusic from "@/assets/islamic wedding music.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // User intent: true = wants music on, false = explicitly muted
  const userMutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Create audio element once
    const audio = new Audio(weddingMusic);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    const syncState = () => setPlaying(!audio.paused);
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);

    // Try immediate autoplay (likely blocked by browsers)
    audio.play().then(syncState).catch(() => {
      // Fallback: start on first user interaction
    });

    const handleFirstInteraction = () => {
      if (userMutedRef.current) return;
      if (audio.paused) {
        audio.play().then(syncState).catch(() => {});
      }
    };

    const interactionEvents = ["click", "touchstart", "scroll", "keydown", "mousemove"];
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, handleFirstInteraction, { passive: true })
    );

    // Pause when tab becomes hidden, resume when visible (unless user muted)
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (!userMutedRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Stop when user leaves the site
    const handlePageHide = () => {
      audio.pause();
    };
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      userMutedRef.current = true;
      audio.pause();
    } else {
      userMutedRef.current = false;
      audio.play().then(() => setPlaying(true)).catch((err) =>
        console.error("Playback failed:", err)
      );
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed top-6 right-6 z-50 h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border border-pink-100 shadow-xl flex items-center justify-center text-primary transition-all duration-500 hover:scale-110 active:scale-95"
    >
      {playing ? (
        <div className="relative flex items-center justify-center">
          <VolumeX size={22} className="animate-pulse text-primary" />
          <span className="absolute h-full w-full rounded-full bg-pink-200 animate-ping opacity-40 -z-10" />
        </div>
      ) : (
        <Music size={22} className="text-gray-400" />
      )}
    </button>
  );
}
