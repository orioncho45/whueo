import { useSelector } from "react-redux";
import { useRef, useCallback } from "react";

// Import your sound files here
import clickSound from "./click.mp3";
import tickSound from "./tick.mp3"
import joinSound from "./join.mp3";
import leaveSound from "./leave.mp3";
import roleSound from "./role.mp3";

const SOUND_MAP = {
  click: clickSound,
  tick: tickSound,
  join: joinSound,
  leave: leaveSound,
  role: roleSound,
};

/**
 * useSound - plays a sound by type, optionally repeating it.
 *
 * @returns {Function} playSound({ type, repeat }) => stop function
 *
 * - type: key from SOUND_MAP (e.g. "click", "success", "error", "notification")
 * - repeat: false/0 => play once
 *           true    => repeat indefinitely (every time the clip ends)
 *           number  => repeat every `repeat` ms
 *
 * Usage:
 *   const playSound = useSound();
 *   const stop = playSound({ type: "notification", repeat: 1000 });
 *   ...
 *   stop(); // stops playback, just like clearInterval
 */
export default function useSound() {
  const volume = useSelector((state) => state.settings.volume);
  const activeAudiosRef = useRef(new Set());

  const playSound = useCallback(
    ({ type, repeat = false }) => {
      const src = SOUND_MAP[type];
      if (!src) {
        console.warn(`useSound: unknown sound type "${type}"`);
        return () => {};
      }

      let stopped = false;
      let intervalId = null;
      let audio = null;

      const createAndPlay = () => {
        const a = new Audio(src);
        console.log(volume)
        a.volume = Number(volume)/100;
        activeAudiosRef.current.add(a);
        a.play().catch((err) => console.warn("useSound: play failed", err));
        return a;
      };

      const cleanupAudio = (a) => {
        if (!a) return;
        a.pause();
        a.currentTime = 0;
        activeAudiosRef.current.delete(a);
      };

      if (!repeat) {
        // Play once
        audio = createAndPlay();
      } else if (repeat === true) {
        // Repeat indefinitely, replaying when the clip ends
        const loopPlay = () => {
          if (stopped) return;
          audio = createAndPlay();
          audio.addEventListener("ended", loopPlay, { once: true });
        };
        loopPlay();
      } else if (typeof repeat === "number") {
        // Repeat every `repeat` ms
        audio = createAndPlay();
        intervalId = setInterval(() => {
          if (stopped) return;
          audio = createAndPlay();
        }, repeat);
      }

      // Stopper, mirrors clearInterval's behavior
      const stop = () => {
        if (stopped) return;
        stopped = true;
        if (intervalId) clearInterval(intervalId);
        cleanupAudio(audio);
      };

      return stop;
    },
    [volume]
  );

  return playSound;
}