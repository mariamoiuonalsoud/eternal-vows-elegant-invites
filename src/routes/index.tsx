import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import floralCorner from "@/assets/floral-corner.png";
import floralWreath from "@/assets/floral-wreath.png";
import { RsvpForm } from "@/components/RsvpForm";
import { MusicToggle } from "@/components/MusicToggle";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed & Sana — Wedding Invitation · 27 May 2026" },
      {
        name: "description",
        content:
          "You are invited to the wedding of Mohamed & Sana on Wednesday, 27 May 2026 at Hindpool Community Centre, Barrow-in-Furness.",
      },
      { property: "og:title", content: "Mohamed & Sana — Wedding Invitation" },
      {
        property: "og:description",
        content: "Wednesday, 27 May 2026 · Hindpool Community Centre.",
      },
    ],
  }),
  component: Invitation,
});

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

function Invitation() {
  const mapsUrl = "https://maps.app.goo.gl/NtBAcaEKnDdjedR76";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <MusicToggle />
      <Toaster position="top-center" />

      {/* Decorative corner florals */}
      <img
        src={floralCorner}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute top-0 left-0 w-[55%] max-w-[420px] -translate-x-[15%] -translate-y-[10%] opacity-95"
      />
      <img
        src={floralCorner}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute top-0 right-0 w-[55%] max-w-[420px] translate-x-[15%] -translate-y-[10%] opacity-95 -scale-x-100"
      />
      <img
        src={floralCorner}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute bottom-0 left-0 w-[55%] max-w-[420px] -translate-x-[15%] translate-y-[10%] opacity-95 -scale-y-100"
      />
      <img
        src={floralCorner}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute bottom-0 right-0 w-[55%] max-w-[420px] translate-x-[15%] translate-y-[10%] opacity-95 -scale-100"
      />

      <div className="relative max-w-2xl mx-auto pt-16 pb-24 z-10">
        {/* Bismillah */}
        <Section className="text-center pt-8">
          <h1 className="font-arabic text-3xl md:text-4xl text-[var(--primary)] leading-loose">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h1>
          <div className="mt-6 mx-auto w-24 h-px bg-border" />
        </Section>

        {/* Invitation line */}
        <Section className="text-center mt-12">
          <p className="font-display text-2xl md:text-3xl text-foreground/80 italic leading-relaxed">
            You Are Invited<br />To The Wedding Of
          </p>
        </Section>

        {/* Names with wreath */}
        <Section className="mt-10 flex items-center justify-center">
          <div className="relative w-[88vw] max-w-[440px] aspect-square flex items-center justify-center">
            <img
              src={floralWreath}
              alt="Floral wreath surrounding the couple's names"
              className="absolute inset-0 w-full h-full object-contain"
              width={1024}
              height={1024}
            />
            <div className="relative text-center px-10">
              <p className="font-script text-5xl md:text-6xl text-[var(--primary)] leading-none">Mohamed</p>
              <p className="font-display italic text-2xl my-2 text-[var(--rose)]">&</p>
              <p className="font-script text-5xl md:text-6xl text-[var(--primary)] leading-none">Sana</p>
            </div>
          </div>
        </Section>

        {/* Date */}
        <Section className="mt-14 text-center">
          <p className="tracking-[0.35em] text-sm text-muted-foreground uppercase">May</p>
          <div className="mt-4 flex items-center justify-center gap-6 md:gap-10">
            <div className="border border-border px-4 py-2 text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Wednesday
            </div>
            <div className="font-display text-7xl md:text-8xl text-[var(--primary)]">27</div>
            <div className="border border-border px-4 py-2 text-xs tracking-[0.3em] uppercase text-muted-foreground">
              At 07:00 PM
            </div>
          </div>
          <p className="mt-4 font-display text-xl text-foreground/70">2026</p>
        </Section>

        {/* Location */}
        <Section className="mt-16 text-center">
          <div className="mx-auto w-12 h-px bg-border mb-6" />
          <h2 className="font-display text-2xl md:text-3xl text-[var(--primary)]">
            Hindpool Community Centre
          </h2>
          <p className="mt-3 text-muted-foreground italic">
            Nelson St, Barrow-in-Furness<br />LA14 1NF
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 px-7 py-3 border border-[var(--primary)] text-[var(--primary)] tracking-[0.25em] text-xs uppercase hover:bg-[var(--primary)] hover:text-primary-foreground transition-all"
          >
            <MapPin size={14} />
            View Location on Map
          </a>
        </Section>

        {/* RSVP */}
        <Section className="mt-24 text-center">
          <div className="mx-auto w-12 h-px bg-border mb-6" />
          <p className="font-script text-5xl text-[var(--rose)] mb-2">Kindly RSVP</p>
          <p className="text-muted-foreground italic mb-10">
            Your presence would honour us
          </p>
          <div className="px-2">
            <RsvpForm />
          </div>
        </Section>

        {/* Footer */}
        <Section className="mt-24 text-center">
          <p className="font-arabic text-xl text-[var(--primary)]">
            بَارَكَ ٱللَّٰهُ لَكُمَا
          </p>
          <p className="mt-3 text-xs tracking-[0.3em] uppercase text-muted-foreground">
            With Love · Mohamed &amp; Sana
          </p>
        </Section>
      </div>
    </main>
  );
}
