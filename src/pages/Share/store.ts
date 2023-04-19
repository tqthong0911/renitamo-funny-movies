import { IStateStores } from "stores";
import { StoreSlice } from "common/store/types";
import { generaVideoByInfo, getVideos, setVideo } from "common/helper";
import { DEFAULT_DATA_SROTE } from "./constants";
import { IShareStore } from "./type";

const createShareSlice: StoreSlice<IShareStore, IStateStores> = (set, get) => ({
  share: {
    data: { ...DEFAULT_DATA_SROTE },
    shareVideo: async (url) => {
      const { email } = get().data;
      const objQuery = new URL(url);
      const id = objQuery.searchParams.get("v");

      if (!id) return;

      set((state) => {
        state.share.data.loading = true;
      });

      const videos = getVideos();
      const newVideo = generaVideoByInfo({
        id,
        shareBy: email,
      });

      const isExist = videos.find(
        (video) =>
          video.id === newVideo.id && video.shareBy === newVideo.shareBy
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => {
        state.share.data.loading = false;
      });

      if (isExist) return;

      setVideo(newVideo);
    },
  },
});

export default createShareSlice;
export type { IShareStore };
