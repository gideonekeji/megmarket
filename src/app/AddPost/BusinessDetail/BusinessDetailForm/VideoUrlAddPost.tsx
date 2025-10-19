import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import useTranslation from "@/app/hooks/useTranslation";
import WithoutStcik from "@/app/componets/ReuseCompnets/WithoutStcik";

function VideoUrlAddPost() {
  const dispatch = useDispatch();
  const video_url = useAppSelector((state) => state.AddPost.video_url);

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ video_url: event.target.value }));
  };

  const { getTranslation } = useTranslation();

  return (
    <div className="w-full">
      <WithoutStcik
        label={getTranslation("Enter Video URL", "Enter Video URL")}
        name="video-url"
        placeholder={getTranslation("Enter your video URL", "Enter your video URL")}
        value={video_url}
        onChange={handleVideoUrlChange}
        required={false}
      />
    </div>
  );
}

export default VideoUrlAddPost;
