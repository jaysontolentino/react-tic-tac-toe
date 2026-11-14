import type { Player } from "@/lib/game";

let ctx: AudioContext | null = null;

function beep(freq: number, ms = 120, type: OscillatorType = "triangle") {
  try {
    ctx ??= new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + ms / 1000);
  } catch {
    /* audio unavailable — ignore */
  }
}

export const sfx = {
  place: (p: Player) => beep(p === "X" ? 520 : 390),
  win: () =>
    [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, 220), i * 130)),
  draw: () => beep(220, 320, "sawtooth"),
};
