import { act, renderHook } from "@testing-library/react-native";

import { useAdhkarAudio } from "./useAdhkarAudio";

const mockPlayer = {
  play: jest.fn(),
  pause: jest.fn(),
  replace: jest.fn(),
  seekTo: jest.fn(),
};

let mockStatus = {
  playing: false,
  isBuffering: false,
  currentTime: 0,
  duration: 100,
  didJustFinish: false,
};

jest.mock("expo-audio", () => ({
  useAudioPlayer: jest.fn(() => mockPlayer),
  useAudioPlayerStatus: jest.fn(() => mockStatus),
}));

jest.mock("@/features-adhkar/data/adhkar-audio-assets", () => ({
  getAdhkarAudioSource: jest.fn((id?: number) => (id ? { uri: `audio-${id}.mp3` } : undefined)),
}));

describe("useAdhkarAudio", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockStatus = {
      playing: false,
      isBuffering: false,
      currentTime: 0,
      duration: 100,
      didJustFinish: false,
    };
  });

  it("returns default state", () => {
    const { result } = renderHook(() => useAdhkarAudio());

    expect(result.current.activeSourceId).toBe(null);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it("does nothing when sourceId is missing", async () => {
    const { result } = renderHook(() => useAdhkarAudio());

    await act(async () => {
      await result.current.play();
    });

    expect(mockPlayer.play).not.toHaveBeenCalled();
    expect(mockPlayer.replace).not.toHaveBeenCalled();
  });

  it("plays new audio source", async () => {
    const { result } = renderHook(() => useAdhkarAudio());

    await act(async () => {
      await result.current.play(1);
    });

    expect(mockPlayer.replace).toHaveBeenCalledWith({
      uri: "audio-1.mp3",
    });

    expect(mockPlayer.seekTo).toHaveBeenCalledWith(0);
    expect(mockPlayer.play).toHaveBeenCalled();

    expect(result.current.activeSourceId).toBe(1);
  });

  it("pauses when tapping currently playing source", async () => {
    const { result } = renderHook(() => useAdhkarAudio());

    await act(async () => {
      await result.current.play(1);
    });

    mockStatus.playing = true;

    await act(async () => {
      await result.current.play(1);
    });

    expect(mockPlayer.pause).toHaveBeenCalled();
  });

  it("switches to another audio source", async () => {
    const { result } = renderHook(() => useAdhkarAudio());

    await act(async () => {
      await result.current.play(1);
    });

    await act(async () => {
      await result.current.play(2);
    });

    expect(mockPlayer.replace).toHaveBeenCalledTimes(2);
    expect(mockPlayer.replace).toHaveBeenLastCalledWith({
      uri: "audio-2.mp3",
    });

    expect(result.current.activeSourceId).toBe(2);
  });

  it("pauses audio with pause()", () => {
    const { result } = renderHook(() => useAdhkarAudio());

    act(() => {
      result.current.pause();
    });

    expect(mockPlayer.pause).toHaveBeenCalled();
  });

  it("stops audio and resets state", async () => {
    const { result } = renderHook(() => useAdhkarAudio());

    await act(async () => {
      await result.current.play(1);
    });

    act(() => {
      result.current.stop();
    });

    expect(mockPlayer.pause).toHaveBeenCalled();
    expect(mockPlayer.seekTo).toHaveBeenCalledWith(0);

    expect(result.current.activeSourceId).toBe(null);
  });

  it("resets active source when audio finishes", async () => {
    const { result, rerender } = renderHook(() => useAdhkarAudio(), {
      initialProps: {},
    });

    await act(async () => {
      await result.current.play(1);
    });

    expect(result.current.activeSourceId).toBe(1);

    mockStatus.didJustFinish = true;

    rerender({});

    expect(result.current.activeSourceId).toBe(null);
  });

  it("calculates progress correctly", () => {
    mockStatus.currentTime = 50;
    mockStatus.duration = 100;

    const { result } = renderHook(() => useAdhkarAudio());

    expect(result.current.progress).toBe(0.5);
  });

  it("caps progress at 1", () => {
    mockStatus.currentTime = 200;
    mockStatus.duration = 100;

    const { result } = renderHook(() => useAdhkarAudio());

    expect(result.current.progress).toBe(1);
  });

  it("returns zero progress when duration is zero", () => {
    mockStatus.duration = 0;
    mockStatus.currentTime = 50;

    const { result } = renderHook(() => useAdhkarAudio());

    expect(result.current.progress).toBe(0);
  });
});
