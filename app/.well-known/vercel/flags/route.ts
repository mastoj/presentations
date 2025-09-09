import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import * as flags from "@/lib/flags";

export const GET = createFlagsDiscoveryEndpoint(async () => {
  const apiData = await getProviderData(flags);
  return apiData;
});
