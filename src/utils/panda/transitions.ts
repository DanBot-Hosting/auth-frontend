export function generateTransitionConditions() {
  let result: Record<string, string> = {};

  for (let mode of ["true", "false"]) {
    result[
      `transitions${mode === "true" ? "Enabled" : "Disabled"}`
    ] = `[data-transitions=${mode}] &`;
  }

  return result;
}
