import { get } from "@vercel/edge-config";
import { decryptFlagValues } from "flags";
import { flag } from "flags/next";
import { createEdgeConfigAdapter } from "./edge-config-adapter";

export const getFlags = async (overrideString?: string) => {
  const flags = (await get("flags")) as Record<string, boolean>;
  if (!overrideString) return flags;
  const overrides = overrideString
    ? (await decryptFlagValues(overrideString)) ?? {}
    : {};
  return { ...flags, ...overrides };
};

const edgeConfigAdapter = createEdgeConfigAdapter(process.env.EDGE_CONFIG!, {
  teamSlug: "mastojs-projects",
});

export const showNotesFlag = flag<boolean>({
  key: "show-notes",
  adapter: edgeConfigAdapter(),
});

export const lightThemeFlag = flag<boolean>({
  key: "light-theme",
  adapter: edgeConfigAdapter(),
});

export const precomputedFlags = [showNotesFlag, lightThemeFlag];
