"use client";
import { cn } from "@/lib/utils";
import { CldVideoPlayer } from "next-cloudinary";
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
  const posterUrl = `https://res.cloudinary.com/dfsp4lpf1/video/upload/so_0/c_limit,h_700,w_400/${cloudinaryId}.avif`;
  return (
    <CldVideoPlayer
      id={id ?? cloudinaryId}
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
