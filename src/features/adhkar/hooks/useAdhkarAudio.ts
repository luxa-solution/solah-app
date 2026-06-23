import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";

import { getAdhkarAudioSource } from "@/features-adhkar/data/adhkar-audio-assets";

export function useAdhkarAudio() {
  // null source up front; we swap it via `replace` when the user taps play
  const player = useAudioPlayer(undefined);
  const status = useAudioPlayerStatus(player);

  // Track which entry (by sourceId) is currently loaded, so the UI knows
  // which button should show "playing" state.
  const [activeSourceId, setActiveSourceId] = useState<number | null>(null);
  const requestedSourceId = useRef<number | null>(null);

  const play = useCallback(
    async (sourceId?: number) => {
      const audioSource = getAdhkarAudioSource(sourceId);
      if (!audioSource || !sourceId) return;

      // Toggle: tapping the same entry's play button again pauses it.
      if (activeSourceId === sourceId && status.playing) {
        player.pause();
        return;
      }

      // Switching to a different entry's audio, or resuming the same one.
      if (activeSourceId !== sourceId) {
        requestedSourceId.current = sourceId;
        player.replace(audioSource);

        setActiveSourceId(sourceId);

        player.seekTo(0);
      }

      player.play();
    },
    [activeSourceId, status.playing, player]
  );

  const pause = useCallback(() => {
    player.pause();
  }, [player]);

  const stop = useCallback(() => {
    player.pause();
    player.seekTo(0);
    setActiveSourceId(null);
  }, [player]);

  // Auto-reset "active" state once playback finishes, so the icon reverts
  // from pause -> play.
  useEffect(() => {
    if (status.didJustFinish) {
      setActiveSourceId(null);
    }
  }, [status.didJustFinish]);

  return {
    /** Call with an entry's sourceId to play/pause/resume it. */
    play,
    pause,
    stop,
    /** sourceId of the entry currently loaded (null if nothing active). */
    activeSourceId,
    /** True if audio is actively playing right now. */
    isPlaying: status.playing,
    /** True while expo-audio is buffering/loading the current source. */
    isLoading: status.isBuffering,
    /** 0..1 progress of the current track, for an optional progress bar. */
    progress: status.duration > 0 ? Math.min(status.currentTime / status.duration, 1) : 0,
  };
}
