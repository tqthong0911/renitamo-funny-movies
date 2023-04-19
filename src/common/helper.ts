import { ReactText } from "react";
import { LOCAL_STORAGE_KEY } from "./constants";
import { IVideo } from "./type";

export const getVideos: () => IVideo[] = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.VIDEOS) || "[]");
};

export const setVideo = (video: IVideo) => {
  const videos = getVideos();
  videos.push(video);

  localStorage.setItem(LOCAL_STORAGE_KEY.VIDEOS, JSON.stringify(videos));
};

export const generaVideoByInfo: (info: {
  id: ReactText;
  codeVideo?: string;
  shareBy: string;
}) => IVideo = ({ id, shareBy, codeVideo }) => {
  return {
    id,
    shareBy,
    url: `https://www.youtube.com/embed/${codeVideo || id}`,
    title: `Title ${id}`,
    subTitle: `subTitle ${id}`,
    description: `Description ${id}`,
  };
};

export const InitData = () => {
  const db = getVideos();

  if (db && db.length > 0) return;

  const length = 3;
  const result = [];

  for (let index = 0; index < length; index++) {
    result.push(
      generaVideoByInfo({
        id: index,
        codeVideo: "UrHpugioVpc",
        shareBy: "tqthong",
      })
    );
  }

  localStorage.setItem(LOCAL_STORAGE_KEY.VIDEOS, JSON.stringify(result));
};
