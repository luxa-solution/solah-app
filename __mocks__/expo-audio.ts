export const useAudioPlayer = jest.fn(() => ({
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(),
  replace: jest.fn(),
}));

export const useAudioPlayerStatus = jest.fn(() => ({
  playing: false,
  isBuffering: false,
  didJustFinish: false,
  currentTime: 0,
  duration: 0,
}));
