import { get } from "@vercel/edge-config";
import { FlagOverridesType, decrypt } from "flags";
import { flag } from "flags/next";
import { createDummyAdapter } from "./dummy-adapter";

export const getFlags = async (overrideString?: string) => {
  const flags = (await get("flags")) as Record<string, boolean>;
  if (!overrideString) return flags;
  const overrides = overrideString
    ? (await decrypt<FlagOverridesType>(overrideString)) ?? {}
    : {};
  return { ...flags, ...overrides };
};

const dummyAdapter = createDummyAdapter();

export const showNotesFlag = flag<boolean>({
  key: "show-notes",
  adapter: dummyAdapter(),
});

export const lightThemeFlag = flag<boolean>({
  key: "light-theme",
  adapter: dummyAdapter(),
});

export const precomputeFlags = [showNotesFlag, lightThemeFlag] as const;
