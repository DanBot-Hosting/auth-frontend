// This is an inline script for initializing settings for datasets to not have blinks on first load.
// Do not move in /public/ as async script tag will not work as intended.
// Pure magic.
// Compile in js and minify it.

const cookies = document.cookie.split("; ");

const raw = (name: string) => cookies.find((row) => row.startsWith(name + "="));

const get = <T extends string>(name: string, def: T): string | T => {
  const rawValue = raw(name);
  return rawValue ? rawValue.split("=")[1] : def;
};

const set = (name: string, value: string) =>
  (document.documentElement.dataset[name] = value);

set("theme", get("theme", "dbh"));
set("themeMode", get("theme-mode", "light"));
set("blurMode", get("blur-mode", "full"));
