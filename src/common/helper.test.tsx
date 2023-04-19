import { ReactText } from "react";
import { LOCAL_STORAGE_KEY } from "./constants";
import { IVideo } from "./type";
import { getVideos, setVideo, generaVideoByInfo, InitData } from "./helper";

describe("Unit tests for yourModule", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Test getVideos function", () => {
    const videos: IVideo[] = [
      {
        id: 1,
        shareBy: "user1",
        url: "https://www.youtube.com/embed/video1",
        title: "Title 1",
        subTitle: "subTitle 1",
        description: "Description 1",
      },
      {
        id: 2,
        shareBy: "user2",
        url: "https://www.youtube.com/embed/video2",
        title: "Title 2",
        subTitle: "subTitle 2",
        description: "Description 2",
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY.VIDEOS, JSON.stringify(videos));

    const result = getVideos();
    expect(result).toEqual(videos);
  });

  test("Test setVideo function", () => {
    const video: IVideo = {
      id: 1,
      shareBy: "user1",
      url: "https://www.youtube.com/embed/video1",
      title: "Title 1",
      subTitle: "subTitle 1",
      description: "Description 1",
    };
    setVideo(video);

    const videos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.VIDEOS) || "[]"
    );
    expect(videos).toEqual([video]);
  });

  test("Test generaVideoByInfo function", () => {
    const info = {
      id: 1,
      codeVideo: "UrHpugioVpc",
      shareBy: "tqthong",
    };
    const result = generaVideoByInfo(info);

    expect(result.id).toEqual(info.id);
    expect(result.shareBy).toEqual(info.shareBy);
    expect(result.url).toEqual(
      `https://www.youtube.com/embed/${info.codeVideo || info.id}`
    );
    expect(result.title).toEqual(`Title ${info.id}`);
    expect(result.subTitle).toEqual(`subTitle ${info.id}`);
    expect(result.description).toEqual(`Description ${info.id}`);
  });

  test("Test InitData function", () => {
    InitData();

    const videos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.VIDEOS) || "[]"
    );
    expect(videos.length).toEqual(3);
  });
});
