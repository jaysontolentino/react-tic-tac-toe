# Tic-Tac-Toe: Kiwi vs. Apple

A two-player tic-tac-toe game with a cartoon fruit theme and a turn timer, built with **Next.js (App Router)**, **React 19**, and **Tailwind CSS**.

Kiwi plays X, Apple plays O. Take turns on a 3×3 board, beat the clock, and keep score across games.

## Features

- **Two-player play:** players alternate turns on a 3×3 board.
- **Win and draw detection:** a win highlights the three winning cells; a full board with no winner is a draw. The status line shows the result.
- **Turn timer:** each turn has 10 seconds. If time runs out, a random empty cell is played for the current player, so every game finishes.
- **Scoreboard:** tracks wins for each player plus draws. The active player's tile is outlined to show whose turn it is.
- **Starts on demand:** the board is locked and the timer is paused until you click **New game**. Kiwi opens the first game.
- **New game:** starts a fresh game and keeps the scores. After the first game, the player who opens alternates.
- **Reset button** (top right): clears the board _and_ all scores and returns to the idle screen. Click **New game** to play again.
- **Sound toggle** (top left): short tones for moves, wins, and draws, generated with the Web Audio API (no audio files). The toggle mutes them.
- **Cartoon theme:** green gradient background, glossy orange tiles, SVG fruit pieces, and a green arrow cursor on hover or focus over empty cells.
- **Accessible:** cells are real buttons with descriptive labels, the status is an `aria-live` region, and focus outlines are visible.

## Tech stack

| Area      | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js (App Router)                       |
| UI        | React 19                                   |
| Styling   | Tailwind CSS v4 + a few custom CSS classes |
| Language  | TypeScript                                 |
| Font      | Lilita One via `next/font/google`          |

## Getting started

This folder contains the game's source files, not a full project. To run it, scaffold a Next.js app and copy the files in.

1. **Create a Next.js project.** The current defaults give you React 19 and Tailwind v4:

   ```bash
   npx create-next-app@latest tic-tac-toe --ts --tailwind --eslint --app --import-alias "@/*"
   cd tic-tac-toe
   ```

2. **Copy the files** from this folder into the new project, replacing the ones that already exist:

   ```
   app/globals.css
   app/layout.tsx
   app/page.tsx
   components/icons.tsx
   components/TicTacToe.tsx
   lib/game.ts
   lib/sound.ts
   ```

   Create the `components/` and `lib/` folders if they don't exist. The `@/*` import alias must point to the project root, which the command above sets up.

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

For a production build, run `npm run build` and then `npm start`.

## Project structure

```
app/
  globals.css        Theme: gradients, glossy tiles, cartoon text, timer bar, animations
  layout.tsx         Root layout, loads the Lilita One font
  page.tsx           Renders the game centered on the page
components/
  TicTacToe.tsx      Game state, timer, board, scoreboard, buttons (client component)
  icons.tsx          SVG fruit pieces and UI icons (apple, kiwi, alarm clock, speaker, reset, arrow)
lib/
  game.ts            Pure win and draw detection (getResult)
  sound.ts           Web Audio sound effects
```

## How it works

- **Game logic** lives in `lib/game.ts`. `getResult(board)` returns `null` while the game is in progress, `{ winner, line }` for a win, and `{ winner: null, line: null }` for a draw.
- **State** is held with React `useState` in `TicTacToe.tsx`: the board, whose turn it is, who opened the current game, the scores, a round counter, and the mute flag. Scores are not saved, so they reset when the page reloads.
- **The timer** is a CSS animation (`drain`) on the bar. The bar is keyed on the round and move count, so it restarts after every move. When the animation ends, `onAnimationEnd` plays a random empty cell. The animation is paused once the game is over.
- **Pieces** are inline SVG components, so no image files are needed.

## Customization

- **Turn length:** change `TURN_MS` at the top of `components/TicTacToe.tsx`.
- **Player names:** edit the `NAMES` object in the same file.
- **Pieces:** edit or replace `Kiwi` and `Apple` in `components/icons.tsx`. `Mark` maps X to kiwi and O to apple.
- **Colors and look:** the theme classes (`.tile`, `.tile-win`, `.title-cartoon`, `.round-btn`, `.btn-green`, `.timer-track`, `.timer-fill`) are in `app/globals.css`.
- **Sounds:** adjust the tones in `lib/sound.ts`.

## Notes

- The theme is fixed and has no light or dark variants, to match the reference design.
- The turn timer keeps running even if the user has reduced-motion enabled, because it is part of the gameplay. Only the piece pop-in animation is turned off.
