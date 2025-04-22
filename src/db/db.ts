/// <reference types="@cloudflare/workers-types" />

if (!("DB" in globalThis)) {
  throw new Error("D1 Database binding 'DB' is missing from globalThis");
}

export const db = globalThis.DB;
