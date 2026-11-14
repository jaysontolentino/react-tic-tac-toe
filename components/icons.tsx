import type { Player } from "@/lib/game";

type P = { className?: string };

const APPLE =
  "M50 26 C36 14 10 22 10 52 C10 78 30 94 42 94 C47 94 48 92 50 92 C52 92 53 94 58 94 C70 94 90 78 90 52 C90 22 64 14 50 26 Z";
const SEEDS = Array.from({ length: 16 }, (_, i) => i * 22.5);

export function Apple({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d={APPLE}
        fill="#e0262b"
        stroke="#8f1d12"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d={APPLE}
        fill="#fff6e0"
        transform="translate(50 58) scale(.82) translate(-50 -58)"
      />
      <ellipse cx="50" cy="58" rx="9" ry="15" fill="#f3dcae" />
      <ellipse
        cx="46"
        cy="58"
        rx="2.2"
        ry="4.5"
        fill="#7a3b12"
        transform="rotate(-12 46 58)"
      />
      <ellipse
        cx="54"
        cy="58"
        rx="2.2"
        ry="4.5"
        fill="#7a3b12"
        transform="rotate(12 54 58)"
      />
      <path
        d="M50 26 C50 18 52 12 57 7"
        stroke="#6b3a12"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Kiwi({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#3c5a14" />
      <circle
        cx="50"
        cy="50"
        r="41"
        fill="#6fbf2a"
        stroke="#3f7d12"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="30" fill="#a5dc3f" />
      <circle cx="50" cy="50" r="11" fill="#f6f9d0" />
      {SEEDS.map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="29"
          rx="2"
          ry="4"
          fill="#1f2a10"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
    </svg>
  );
}

/** X = kiwi, O = apple */
export function Mark({ player, className }: P & { player: Player }) {
  return player === "X" ? (
    <Kiwi className={className} />
  ) : (
    <Apple className={className} />
  );
}

export function AlarmClock({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle
        cx="16"
        cy="13"
        r="9"
        fill="#ff9a1f"
        stroke="#8f1d12"
        strokeWidth="3"
      />
      <circle
        cx="48"
        cy="13"
        r="9"
        fill="#ff9a1f"
        stroke="#8f1d12"
        strokeWidth="3"
      />
      <circle
        cx="32"
        cy="37"
        r="24"
        fill="#ffd23f"
        stroke="#8f1d12"
        strokeWidth="4"
      />
      <circle
        cx="32"
        cy="37"
        r="17"
        fill="#fff7d6"
        stroke="#c9741a"
        strokeWidth="2"
      />
      <path
        d="M32 37 V26 M32 37 L40 42"
        stroke="#8f1d12"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SpeakerIcon({ muted, className }: P & { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="#7a1a0f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9 H8 L13 5 V19 L8 15 H4 Z" fill="#fff3c4" />
      {muted ? (
        <path d="M16 9 L22 15 M22 9 L16 15" />
      ) : (
        <path d="M16 9 Q19 12 16 15 M18.5 6.5 Q23 12 18.5 17.5" />
      )}
    </svg>
  );
}

export function ResetIcon({ className }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="#7a1a0f"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function ArrowPointer({ className }: P) {
  return (
    <svg viewBox="0 0 64 70" className={className} aria-hidden="true">
      <path
        d="M32 4 L60 34 H44 V64 H20 V34 H4 Z"
        fill="#8ae234"
        stroke="#2e6b0a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M32 12 L50 31 H38 V58 H26 V31 H14 Z"
        fill="#b8f26a"
        opacity=".6"
      />
    </svg>
  );
}
