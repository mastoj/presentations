import type { Adapter } from "flags";

/**
 * Allows creating a custom Edge Config adapter for feature flags
 */
export function createDummyAdapter() {
  return function edgeConfigAdapter<ValueType, EntitiesType>(): Adapter<
    ValueType,
    EntitiesType
  > {
    return {
      origin: undefined,
      async decide({ key }): Promise<ValueType> {
        const definitions = {
          "show-notes": true,
          "light-theme": false,
        } as Record<string, boolean>;
        // if a defaultValue was provided this error will be caught and the defaultValue will be used

        // if a defaultValue was provided this error will be caught and the defaultValue will be used
        if (!(key in definitions)) {
          throw new Error(
            `Edge Config Adapter: Flag "${key}" not found in flag config`
          );
        }
        return definitions[key] as ValueType;
      },
    };
  };
}
