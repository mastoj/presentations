"use client";
import { cn } from "@/lib/utils";
import { CldVideoPlayer } from "next-cloudinary";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../node_modules/next-cloudinary/dist/cld-video-player.css";

export type VideoPlayerProps = {
  id?: string;
  width: number;
  height: number;
  cloudinaryId: string;
  className?: string;
};
export const VideoPlayer = ({
  id,
  width,
  height,
  cloudinaryId,
  className,
}: VideoPlayerProps) => {
  const [key, setKey] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const playerId = id ?? cloudinaryId;
  const posterUrl = `https://res.cloudinary.com/dfsp4lpf1/video/upload/so_0/c_limit,h_700,w_400/${cloudinaryId}.avif`;
  useEffect(() => {
    const uniqueValue = Math.random() * 1000;
    const newKey = `${playerId}-${pathname}-${
      searchParams.get("slide") ?? "0"
    }-${uniqueValue}`;
    setKey(newKey);
  }, [pathname, playerId, searchParams]);
  if (!key) {
    return null;
  }
  console.log("==> Player key: ", key);
  return (
    <CldVideoPlayer
      key={key}
      width={width}
      height={height}
      src={cloudinaryId}
      className={cn(className)}
      muted
      autoplay
      playsinline
      poster={posterUrl}
    />
  );
};
