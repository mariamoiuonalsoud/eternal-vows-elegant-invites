import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// استيراد الملف الصوتي
import weddingMusic from "@/assets/islamic wedding music.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // 1. إنشاء عنصر الصوت مرة واحدة فقط عند تحميل الصفحة
    if (!audioRef.current) {
      const audio = new Audio(weddingMusic);
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    // 2. محاولة التشغيل التلقائي فوراً
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => console.log("Autoplay blocked, waiting for interaction..."));

    // 3. وظيفة البدء عند التفاعل
    const handleAutoPlay = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            setPlaying(true);
            cleanUpListeners();
          })
          .catch((err) => console.log("Playback error:", err));
      }
    };

    const cleanUpListeners = () => {
      window.removeEventListener("click", handleAutoPlay);
      window.removeEventListener("touchstart", handleAutoPlay);
      window.removeEventListener("scroll", handleAutoPlay);
      window.removeEventListener("mousemove", handleAutoPlay);
    };

    window.addEventListener("click", handleAutoPlay);
    window.addEventListener("touchstart", handleAutoPlay);
    window.addEventListener("scroll", handleAutoPlay);
    window.addEventListener("mousemove", handleAutoPlay);

    return () => {
      cleanUpListeners();
      // ملاحظة: لا نضع audio.pause() هنا لكي لا تقفل عند أي تحديث بسيط للـ Component
    };
  }, []); // مصفوفة فارغة لضمان التنفيذ مرة واحدة فقط

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع تداخل النقرات

    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  return (
    <button
      onClick={toggleMusic}
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
