function CloudShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="currentColor" className={className}>
      <rect x="8" y="32" width="84" height="22" rx="11" />
      <ellipse cx="26" cy="34" rx="18" ry="17" />
      <ellipse cx="52" cy="24" rx="24" ry="22" />
      <ellipse cx="76" cy="34" rx="18" ry="17" />
    </svg>
  );
}

function StarShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.36 7.26H22l-6.18 4.49 2.36 7.25L12 16.51l-6.18 4.49 2.36-7.25L2 9.26h7.64L12 2z" />
    </svg>
  );
}

/**
 * Purely decorative, ambient background: slow-drifting clouds and
 * slow-floating geometric shapes (stars, squares, diamonds), matching
 * the reference Neo Brutalism moodboard. No interactivity/state needed,
 * so this stays a server component (pure CSS/Tailwind animation).
 */
export default function FloatingDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Clouds */}
      <div className="absolute left-[4%] top-[8%] animate-drift-slow text-white/80">
        <CloudShape className="h-10 w-20 sm:h-14 sm:w-28" />
      </div>
      <div
        className="absolute right-[6%] top-[14%] animate-drift text-white/70"
        style={{ animationDelay: "1.2s" }}
      >
        <CloudShape className="h-8 w-16 sm:h-12 sm:w-24" />
      </div>
      <div
        className="absolute left-[12%] bottom-[12%] animate-drift-slow text-white/60"
        style={{ animationDelay: "2.5s" }}
      >
        <CloudShape className="h-10 w-20 sm:h-16 sm:w-32" />
      </div>
      <div
        className="absolute right-[16%] bottom-[6%] animate-drift text-white/70"
        style={{ animationDelay: "0.6s" }}
      >
        <CloudShape className="h-7 w-14 sm:h-10 sm:w-20" />
      </div>

      {/* Stars */}
      <div
        className="absolute left-[9%] top-[38%] animate-float text-brutal-yellow"
        style={{ animationDelay: "0.3s" }}
      >
        <StarShape className="h-6 w-6 sm:h-8 sm:w-8" />
      </div>
      <div
        className="absolute right-[10%] top-[48%] animate-float-reverse text-brutal-coral"
        style={{ animationDelay: "1s" }}
      >
        <StarShape className="h-5 w-5 sm:h-7 sm:w-7" />
      </div>
      <div
        className="absolute left-[20%] top-[78%] animate-float text-brutal-purple"
        style={{ animationDelay: "1.8s" }}
      >
        <StarShape className="h-4 w-4 sm:h-6 sm:w-6" />
      </div>

      {/* Squares */}
      <div
        className="absolute right-[22%] bottom-[22%] h-6 w-6 rotate-12 animate-float border-4 border-brutal-black bg-brutal-teal sm:h-8 sm:w-8"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute left-[26%] top-[58%] h-5 w-5 rotate-45 animate-float-reverse border-4 border-brutal-black bg-brutal-purple sm:h-7 sm:w-7"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute right-[5%] bottom-[38%] h-5 w-5 rotate-45 animate-float border-4 border-brutal-black bg-brutal-pink sm:h-6 sm:w-6"
        style={{ animationDelay: "1.3s" }}
      />
      <div
        className="absolute left-[6%] top-[62%] h-4 w-4 rotate-12 animate-float-reverse border-4 border-brutal-black bg-brutal-blue sm:h-6 sm:w-6"
        style={{ animationDelay: "0.9s" }}
      />
    </div>
  );
}
