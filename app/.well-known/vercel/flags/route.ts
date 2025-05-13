import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import { showNotesFlag, lightThemeFlag } from "@/lib/flags";

export const GET = createFlagsDiscoveryEndpoint(async () => {
  // your previous logic in here to gather your feature flags
  const apiData = await getProviderData({ showNotesFlag, lightThemeFlag });

  // return the ApiData directly, without a NextResponse.json object.
  return apiData;
});

// export async function GET(request: NextRequest) {
//   const flags = await getFlags();
//   const access = await verifyAccess(request.headers.get("Authorization"));
//   if (!access) return NextResponse.json(null, { status: 401 });

//   const featureFlags = Object.keys(flags).reduce(
//     (acc, key) => ({
//       ...acc,
//       [key]: {
//         options: [
//           { value: false, label: "Off" },
//           { value: true, label: "On" },
//         ],
//       },
//     }),
//     {}
//   );
//   const response = {
//     definitions: {
//       ...featureFlags,
//     },
//   };

//   return NextResponse.json<ApiData>(response);
// }
