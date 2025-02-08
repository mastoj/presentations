"use client";
import { CldVideoPlayer } from "next-cloudinary";
import "../node_modules/next-cloudinary/dist/cld-video-player.css";

export const VideoPlayer = () => {
  return (
    <div className="max-w-[360px] h-full relative">
      <CldVideoPlayer
        id="next-pre-cdn-video"
        width="360"
        height="640"
        src="next-pre-cdn-video"
        className="max-w-[360px]"
        muted={true}
        autoPlay={true}
      />
    </div>
    // <div className="w-full h-full flex items-center justify-center relative">
    // </div>
  );
};
