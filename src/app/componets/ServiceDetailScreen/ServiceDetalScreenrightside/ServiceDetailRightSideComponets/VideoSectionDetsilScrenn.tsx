import { useAppSelector } from "@/app/hooks/hooks";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import playvideobtn from "../../../../../../public/assets/Image/play-button-arrowhead 1.png";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { usePathname } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";
import ReactPlayer from "react-player";

function VideoSectionDetailScreen() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const { getTranslation } = useTranslation();
  const lastSegment = decodeString(lastSegment1);
  const { data } = useServiceDetailApi(lastSegment);

  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (data?.serviceDetail?.video_url) {
      setVideoUrl(data.serviceDetail.video_url.trim());
    }
  }, [data]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Check if URL is from YouTube
  const isYouTube = (url: string) => /youtube\.com|youtu\.be/.test(url);

  // Check if URL is from Vimeo
  const isVimeo = (url: string) => /vimeo\.com/.test(url);

  // Check if URL is a direct video file
  const isVideoFile = (url: string) => /\.(mp4|mov|webm|ogg)$/i.test(url);

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.searchParams.has("v")) {
        videoId = urlObj.searchParams.get("v")!;
      }

      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=${window.location.origin}`
        : url;
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return url;
    }
  };

  // Convert Vimeo URL to embed format
  const getVimeoEmbedUrl = (url: string) => {
    try {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match
        ? `https://player.vimeo.com/video/${match[1]}?autoplay=1`
        : url;
    } catch (error) {
      console.error("Invalid Vimeo URL:", url);
      return url;
    }
  };

  // Get YouTube video thumbnail
  const getYouTubeThumbnail = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.searchParams.has("v")) {
        videoId = urlObj.searchParams.get("v")!;
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "";
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return "";
    }
  };

  // Handle video play
  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Return null if no video is available
  if (!videoUrl) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode
          ? "text-[#ffffff] bg-[#2F2F2F]"
          : "text-[#3E5155] bg-white photoservicedetailborderandshado"
      }`}
    >
      <div className="text-lg font-medium font-poppins mb-4">
        {getTranslation("Video", "Video")}
      </div>

      <div className="w-full flex flex-col gap-4 relative">
        {/* YouTube Video */}
        {isYouTube(videoUrl) ? (
          <div className="relative w-full rounded-xl">
            {!isPlaying ? (
              <div className="relative w-full h-[200px] md:h-[315px] rounded-xl">
                <img
                  src={getYouTubeThumbnail(videoUrl)}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
                >
                  <Image
                    src={playvideobtn}
                    alt="Play Video"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full  h-[18rem]  rounded-lg"
              ></iframe>
            )}
          </div>
        ) : isVimeo(videoUrl) ? (
          // Vimeo Video
          <iframe
            width="100%"
            height="315"
            src={getVimeoEmbedUrl(videoUrl)}
            title="Vimeo video player"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : isVideoFile(videoUrl) ? (
          // Direct Video File (MP4, MOV, etc.)
          <div className="relative w-full">
            <ReactPlayer
              url={videoUrl}
              controls
              playing={isPlaying}
              width="100%"
              height="315px"
              className="rounded-lg"
            />
            {!isPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
              >
                <Image
                  src={playvideobtn}
                  alt="Play Video"
                  width={50}
                  height={50}
                />
              </button>
            )}
          </div>
        ) : (
          <p className="text-red-500">Invalid video URL</p>
        )}
      </div>
    </div>
  );
}

export default VideoSectionDetailScreen;
