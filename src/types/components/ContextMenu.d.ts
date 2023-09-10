interface ContextMenuProps {
  css?: CSSObject;
  locale?: ContextMenuLocale;
}

interface ContextMenuLocale {
  labels: {
    theme: string;
    blurMode: string;
    background: string;
    transitions: string;
  };
  switches: {
    backgroundEnabled: string;
    backgroundAnimated: string;
    transitions: string;
  };
  placeholders: {
    theme: string;
    blurMode: string;
  };
}
