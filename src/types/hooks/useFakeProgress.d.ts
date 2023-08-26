interface UseFakeProgress {
  progress: number;
  start: () => void;
  stop: () => void;
  set: (value: number) => void;
}
