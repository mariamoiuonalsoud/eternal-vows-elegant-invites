import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import floralCorner from "@/assets/floral-corner.png";
import floralWreath from "@/assets/floral-wreath.png";

import { MusicToggle } from "@/components/MusicToggle";
import { Toaster } from "@/components/ui/sonner";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section {...fadeUp} className={`relative px-6 ${className}`}>
      {children}
    </motion.section>
  );
}

export default function App() {
  const mapsUrl = "https://maps.google.com";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <MusicToggle />
      <Toaster position="top-center" />

      {/* Decorative floral backgrounds */}
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute top-0 left-0 w-[55%] max-w-100 translate-x-[-10%] translate-y-[-10%] opacity-90"
      />
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute top-0 right-0 w-[55%] max-w-100 translate-x-[10%] translate-y-[-10%] opacity-90 -scale-x-100"
      />
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 w-[55%] max-w-100 translate-x-[-10%] translate-y-[10%] opacity-90 -scale-y-100"
      />
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 w-[55%] max-w-100 translate-x-[10%] translate-y-[10%] opacity-90 -scale-100"
      />

      <div className="relative max-w-2xl mx-auto pt-24 pb-32 z-10">
        {/* Bismillah & Verse */}
        <Section className="text-center">
          <h1 className="font-arabic text-4xl md:text-5xl text-primary leading-loose">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-primary/80 mt-4 leading-relaxed">
            "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
          </p>
          <div className="mt-6 mx-auto w-24 h-px bg-border/60" />
        </Section>

        {/* Introduction */}
        <Section className="text-center mt-12">
          <p className="font-display text-2xl md:text-3xl text-foreground/70 italic tracking-wide">
            You Are Invited <br /> To The Wedding Of
          </p>
        </Section>

        {/* The Couple Names */}
        <Section className="mt-10 flex items-center justify-center">
          <div className="relative w-screen max-w-175 aspect-square flex items-center justify-center">
            <img
              src={floralWreath}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="relative text-center flex flex-col items-center justify-center h-full">
              <p className="font-names text-5xl md:text-7xl text-primary italic leading-[0.9] md:leading-none mb-1 pl-4.9 translate-x-3">
                Mohamed
              </p>
              <p className="font-names text-3xl md:text-4xl my-1 md:my-2 text-rose italic">&</p>
              <p className="font-names text-5xl md:text-7xl text-primary italic leading-[0.9] md:leading-none">
                Sana
              </p>
            </div>
          </div>
        </Section>

        {/* Date Details */}
        <Section className="mt-14 text-center">
          <p className="tracking-[0.4em] text-xs text-muted-foreground uppercase mb-4">May</p>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="border-y border-border py-2 px-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Wednesday
            </div>
            <div className="font-display text-7xl md:text-8xl text-primary">27</div>
            <div className="border-y border-border py-2 px-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              At 07:00 PM
            </div>
          </div>
          <p className="mt-4 font-display text-xl text-foreground/60">2026</p>
        </Section>

        {/* Venue Details */}
        <Section className="mt-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-3">
            Hindpool Community Centre
          </h2>
          <p className="text-muted-foreground italic text-sm">
            Nelson St, Barrow-in-Furness <br /> LA14 1NF
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-10 py-3 border border-primary text-primary tracking-[0.2em] text-[10px] uppercase hover:bg-primary hover:text-white transition-all"
          >
            <MapPin size={14} /> View Location on Map
          </a>
        </Section>

        {/* Closing Arabic Text */}
        <Section className="mt-24 text-center">
          <p className="font-arabic text-3xl text-primary">
            بَارَكَ ٱللَّٰهُ لَهُمَا وَبَارَكَ عَلَيْهُمَا <br /> وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ
          </p>
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-muted-foreground opacity-60">
            With Love · Mohamed & Sana
          </p>
        </Section>
      </div>
    </main>
  );
}
