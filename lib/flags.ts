import { flag } from "flags/next";
import { createEdgeConfigAdapter } from "./edge-config-adapter";

const edgeConfigAdapter = createEdgeConfigAdapter(process.env.EDGE_CONFIG!, {
  teamSlug: "mastojs-projects",
});

export const flagShowNotes = flag<boolean>({
  key: "show-notes",
  adapter: edgeConfigAdapter(),
});

export const flagLightTheme = flag<boolean>({
  key: "light-theme",
  adapter: edgeConfigAdapter(),
});

export const flagConfetti = flag<boolean>({
  key: "confetti",
  decide: () => false,
});

export const precomputedFlags = [flagShowNotes, flagLightTheme, flagConfetti];
