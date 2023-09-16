/**
 * Generates and returns a record of transition conditions.
 *
 * @return {Record<string, string>} The generated transition conditions.
 */
export function generateTransitionConditions() {
  let result: Record<string, string> = {};

  for (let mode of ["true", "false"]) {
    result[
      `transitions${mode === "true" ? "Enabled" : "Disabled"}`
    ] = `[data-transitions=${mode}] &`;
  }

  return result;
}
