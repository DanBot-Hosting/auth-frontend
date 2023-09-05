interface Blur {
  name: string;
  value: string;
  tokens?: number[];
  modes?: {
    [key: string]: boolean;
  };
}

interface BlurMode {
  value: {
    [key: `_${string}`]: {
      value: string;
    };
  };
}
