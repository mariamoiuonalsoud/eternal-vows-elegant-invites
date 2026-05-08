import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  guests: z.number().int().min(1).max(20),
  attending: z.boolean(),
  message: z.string().trim().max(500).optional(),
});

export function RsvpForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, guests, attending, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("rsvps").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("Could not send your RSVP. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Your RSVP has been received.");
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <p className="font-script text-5xl text-[var(--rose)] mb-4">Thank You</p>
        <p className="text-muted-foreground italic">Your kind response means the world to us.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      <div>
        <label className="block text-sm tracking-widest uppercase mb-2 text-muted-foreground">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="w-full bg-transparent border-b border-border focus:border-[var(--rose)] outline-none py-2 text-foreground transition-colors font-serif text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm tracking-widest uppercase mb-2 text-muted-foreground">
          Number of Guests
        </label>
        <input
          type="number"
          min={1}
          max={20}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          className="w-full bg-transparent border-b border-border focus:border-[var(--rose)] outline-none py-2 text-foreground font-serif text-lg"
        />
      </div>

      <div>
        <label className="block text-sm tracking-widest uppercase mb-3 text-muted-foreground">
          Will You Attend?
        </label>
        <div className="flex gap-3">
          {[
            { v: true, l: "Joyfully Accept" },
            { v: false, l: "Regretfully Decline" },
          ].map((opt) => (
            <button
              key={String(opt.v)}
              type="button"
              onClick={() => setAttending(opt.v)}
              className={`flex-1 py-2 px-3 text-sm tracking-wide border transition-all ${
                attending === opt.v
                  ? "bg-[var(--primary)] text-primary-foreground border-[var(--primary)]"
                  : "border-border text-muted-foreground hover:border-[var(--rose)]"
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm tracking-widest uppercase mb-2 text-muted-foreground">
          Message (Optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full bg-transparent border-b border-border focus:border-[var(--rose)] outline-none py-2 text-foreground font-serif resize-none"
          placeholder="Share a blessing or wish..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-3 bg-[var(--primary)] text-primary-foreground tracking-[0.3em] text-sm uppercase hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
