import { useEffect, useRef } from "react";
import bgVideo from "@/assets/background-video.mp4";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const ensurePlay = () => {
      if (v.paused) {
        v.play().catch(() => {});
      }
    };

    const onVisibility = () => {
      if (!document.hidden) ensurePlay();
    };

    v.play().catch(() => {});
    document.addEventListener("visibilitychange", onVisibility);
    const interval = setInterval(ensurePlay, 1000);
    v.addEventListener("pause", ensurePlay);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(interval);
      v.removeEventListener("pause", ensurePlay);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/55" />
    </div>
  );
};

export default VideoBackground;
