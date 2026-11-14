"use client";

import { useState, type CSSProperties } from "react";
import { getResult, type Cell, type Player } from "@/lib/game";
import { sfx } from "@/lib/sound";
import {
  AlarmClock,
  ArrowPointer,
  Mark,
  ResetIcon,
  SpeakerIcon,
} from "./icons";

const TURN_MS = 10_000; // time per turn; a random move is played when it runs out
const EMPTY: Cell[] = Array(9).fill(null);
const NAMES: Record<Player, string> = { X: "Kiwi", O: "Apple" };

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(EMPTY);
  const [turn, setTurn] = useState<Player>("X");
  const [starter, setStarter] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(0);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false); // nothing runs until New game is clicked

  const result = getResult(board);
  const moves = board.filter(Boolean).length;

  function play(i: number) {
    if (!started || board[i] || result) return;
    const next = board.map((c, idx) => (idx === i ? turn : c));
    setBoard(next);

    const r = getResult(next);
    if (r) {
      setScores((s) =>
        r.winner
          ? { ...s, [r.winner]: s[r.winner] + 1 }
          : { ...s, draws: s.draws + 1 },
      );
      if (!muted) (r.winner ? sfx.win : sfx.draw)();
    } else {
      setTurn(turn === "X" ? "O" : "X");
      if (!muted) sfx.place(turn);
    }
  }

  function autoPlay() {
    if (!started || result) return;
    const empty = board.flatMap((c, i) => (c ? [] : [i]));
    play(empty[Math.floor(Math.random() * empty.length)]);
  }

  function newGame() {
    // First game: Kiwi opens. After that, the opener alternates.
    const next: Player = !started ? "X" : starter === "X" ? "O" : "X";
    setStarted(true);
    setStarter(next);
    setTurn(next);
    setBoard(EMPTY);
    setRound((r) => r + 1);
  }

  /** Full reset: clears the board and scores and returns to the idle screen. */
  function resetAll() {
    setScores({ X: 0, O: 0, draws: 0 });
    setStarter("X");
    setTurn("X");
    setBoard(EMPTY);
    setStarted(false);
    setRound((r) => r + 1);
  }

  const status = !started
    ? "Press New game to start"
    : result
      ? result.winner
        ? `${NAMES[result.winner]} wins!`
        : "It's a draw!"
      : `${NAMES[turn]}'s turn`;

  const focus =
    "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";

  const ScoreTile = ({ player }: { player: Player }) => (
    <>
      <div
        className={`tile grid size-14 sm:size-16 place-items-center transition-transform ${
          started && !result && turn === player ? "tile-active scale-105" : ""
        }`}
      >
        <Mark player={player} className="relative w-3/4" />
      </div>
      <div className="tile grid size-14 sm:size-16 place-items-center">
        <span className="num-cartoon relative text-4xl tabular-nums">
          {scores[player]}
        </span>
      </div>
    </>
  );

  return (
    <section className="mx-auto w-full max-w-sm space-y-4 px-4 py-6">
      {/* Header */}
      <header className="relative flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={muted}
          className={`round-btn grid size-11 shrink-0 place-items-center ${focus}`}
        >
          <SpeakerIcon muted={muted} className="size-6" />
        </button>

        <h1 className="title-cartoon min-w-0 whitespace-nowrap text-center text-3xl sm:text-4xl">
          TIC-TAC-TOE
        </h1>

        <button
          type="button"
          onClick={resetAll}
          aria-label="Reset game and scores"
          className={`round-btn grid size-11 shrink-0 place-items-center ${focus}`}
        >
          <ResetIcon className="size-6" />
        </button>
      </header>

      {/* Turn timer */}
      <div
        className="flex items-center"
        role="timer"
        aria-label="Time left this turn"
      >
        <AlarmClock className="relative z-10 size-11 shrink-0" />
        <div className="timer-track -ml-3 h-5 flex-1">
          <div
            key={`${round}-${moves}`}
            className="timer-fill"
            style={
              {
                "--turn-ms": `${TURN_MS}ms`,
                animationPlayState: !started || result ? "paused" : "running",
              } as CSSProperties
            }
            onAnimationEnd={autoPlay}
          />
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3">
        {board.map((value, i) => {
          const isWinning = !!result?.line?.includes(i);
          const playable = started && !value && !result;
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={!playable}
              aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}: ${value ? NAMES[value] : "empty"}`}
              className={`tile group grid aspect-square place-items-center overflow-visible ${
                isWinning ? "tile-win" : ""
              } ${playable ? "cursor-pointer" : "cursor-default"} ${focus}`}
            >
              {value && <Mark player={value} className="pop relative w-4/5" />}
              {playable && (
                <ArrowPointer className="pointer-events-none absolute -bottom-1 right-1 w-9 rotate-[-30deg] opacity-0 drop-shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              )}
            </button>
          );
        })}
      </div>

      {/* Status */}
      <p
        aria-live="polite"
        className={`text-center ${
          result
            ? "num-cartoon text-3xl"
            : "text-xl text-white [text-shadow:0_2px_0_rgba(0,0,0,.35)]"
        }`}
      >
        {status}
      </p>

      {/* Scoreboard: kiwi on the left, apple on the right */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <ScoreTile player="X" />
        </div>
        <span className="shrink-0 whitespace-nowrap px-1 text-center text-sm leading-tight text-white/90 [text-shadow:0_2px_0_rgba(0,0,0,.35)]">
          Draws
          <br />
          <span className="text-lg tabular-nums">{scores.draws}</span>
        </span>
        <div className="flex flex-row-reverse gap-2">
          <ScoreTile player="O" />
        </div>
      </div>

      <button
        type="button"
        onClick={newGame}
        className={`btn-green w-full py-3 text-xl text-white ${focus}`}
      >
        New game
      </button>
    </section>
  );
}
