"use client";
import { createContext, PropsWithChildren, useContext } from "react";

type FlagState = {
  showNotes: boolean;
};

const FlagsContext = createContext<FlagState>({
  showNotes: false,
});

type FlagsProviderProps = {
  flags: FlagState;
};

const FlagsProvider = ({
  children,
  flags,
}: PropsWithChildren<FlagsProviderProps>) => {
  return <FlagsContext value={flags}>{children}</FlagsContext>;
};

export const useFlags = () => {
  return useContext(FlagsContext);
};

export default FlagsProvider;
