"use client";

import { useState } from "react";
import { getResult, type Cell, type Player } from "@/lib/game";

const EMPTY: Cell[] = Array(9).fill(null);

// Full class strings so Tailwind can detect them
const tone = {
  X: {
    text: "text-indigo-600 dark:text-indigo-400",
    win: "bg-indigo-500/10 ring-2 ring-indigo-500",
    active: "ring-2 ring-indigo-500",
  },
  O: {
    text: "text-amber-500 dark:text-amber-400",
    win: "bg-amber-500/10 ring-2 ring-amber-500",
    active: "ring-2 ring-amber-500",
  },
} as const;

function Mark({
  player,
  animate = false,
  className = "",
}: {
  player: Player;
  animate?: boolean;
  className?: string;
}) {
  const draw = animate ? "draw" : "";
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {player === "X" ? (
        <>
          <path d="M24 24 L76 76" pathLength={1} className={draw} />
          <path
            d="M76 24 L24 76"
            pathLength={1}
            className={`${draw} ${animate ? "draw-late" : ""}`}
          />
        </>
      ) : (
        <circle cx="50" cy="50" r="28" pathLength={1} className={draw} />
      )}
    </svg>
  );
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(EMPTY);
  const [turn, setTurn] = useState<Player>("X");
  const [starter, setStarter] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = getResult(board);

  function play(i: number) {
    if (board[i] || result) return;
    const next = board.map((c, idx) => (idx === i ? turn : c));
    setBoard(next);

    const r = getResult(next);
    if (r) {
      setScores((s) =>
        r.winner
          ? { ...s, [r.winner]: s[r.winner] + 1 }
          : { ...s, draws: s.draws + 1 },
      );
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function newGame() {
    const next: Player = starter === "X" ? "O" : "X"; // alternate who opens
    setStarter(next);
    setTurn(next);
    setBoard(EMPTY);
  }

  const status = result
    ? result.winner
      ? `${result.winner} wins!`
      : "It's a draw"
    : `${turn}'s turn`;

  const tile =
    "flex flex-col items-center gap-1 rounded-2xl bg-white px-3 py-3 ring-1 ring-stone-900/10 dark:bg-white/5 dark:ring-white/10";

  return (
    <section className="w-full max-w-sm space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Tic-Tac-Toe</h1>

      {/* Scoreboard — the highlighted tile shows whose turn it is */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {(["X", "draws", "O"] as const).map((key) => {
          const isPlayer = key !== "draws";
          const active = isPlayer && !result && turn === key;
          return (
            <div
              key={key}
              className={`${tile} transition-shadow ${active ? tone[key as Player].active : ""}`}
            >
              {isPlayer ? (
                <Mark player={key} className={`size-5 ${tone[key].text}`} />
              ) : (
                <span className="h-5 leading-5 text-stone-500 dark:text-stone-400">
                  Draws
                </span>
              )}
              <span className="text-xl font-semibold tabular-nums">
                {scores[key]}
              </span>
            </div>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="text-center text-lg font-medium text-stone-700 dark:text-stone-300"
      >
        {status}
      </p>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3">
        {board.map((value, i) => {
          const isWinning = !!result?.line?.includes(i);
          const dimmed = !!result?.winner && !isWinning;
          const playable = !value && !result;
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={!playable}
              aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}: ${value ?? "empty"}`}
              className={[
                "group grid aspect-square place-items-center rounded-2xl ring-1 transition",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 dark:focus-visible:outline-white",
                isWinning && result?.winner
                  ? tone[result.winner].win
                  : "bg-white ring-stone-900/10 dark:bg-white/5 dark:ring-white/10",
                playable
                  ? "cursor-pointer hover:bg-stone-50 dark:hover:bg-white/10"
                  : "cursor-default",
              ].join(" ")}
            >
              {value ? (
                <Mark
                  player={value}
                  animate
                  className={`w-1/2 ${tone[value].text} ${dimmed ? "opacity-40" : ""}`}
                />
              ) : (
                playable && (
                  <Mark
                    player={turn}
                    className={`w-1/2 opacity-0 transition-opacity group-hover:opacity-20 group-focus-visible:opacity-20 ${tone[turn].text}`}
                  />
                )
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={newGame}
        className="w-full rounded-full bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 active:scale-[0.99] dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 dark:focus-visible:outline-white"
      >
        New game
      </button>
    </section>
  );
}
