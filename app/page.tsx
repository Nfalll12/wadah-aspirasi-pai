import FloatingDecor from "@/components/FloatingDecor";
import AspirationForm from "@/components/AspirationForm";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream px-4 py-12 sm:py-16">
      <FloatingDecor />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border-4 border-brutal-black bg-brutal-blue px-4 py-1.5 shadow-brutal-sm">
          <Sparkles className="h-4 w-4" strokeWidth={2.5} />
          <span className="font-display text-xs font-bold uppercase tracking-widest">
            HMPS PAI 2026-2027
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          WADAH ASPIRASI{" "}
          <span className="inline-block -rotate-2 rounded-lg border-4 border-brutal-black bg-brutal-yellow px-3 py-1 text-brutal-black shadow-brutal-sm">
            PAI
          </span>
        </h1>

        <p className="mt-5 max-w-md font-body text-lg font-medium text-black/70 sm:text-xl">
          Suarakan isi pikiranmu di sini! 💬
        </p>

        <div className="mt-10 w-full">
          <AspirationForm />
        </div>

        <p className="mt-8 max-w-sm font-body text-sm text-black/50">
          Aspirasimu langsung tersampaikan ke pengurus HMPS PAI. Boleh pakai nama, boleh
          juga anonim &mdash; yang penting suaramu terdengar.
        </p>
      </div>
    </main>
  );
}
