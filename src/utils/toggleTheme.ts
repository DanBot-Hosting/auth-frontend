"use server";
import { cookies } from "next/headers";

export async function toggleTheme() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const toggled = theme?.value === "dark" ? "light" : "dark";

  cookieStore.set("theme", toggled);
}
