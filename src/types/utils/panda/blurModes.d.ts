interface Blur {
  name: string;
  value: string;
  tokens?: number[];
  modes?: {
    [key: string]: boolean;
  };
}
