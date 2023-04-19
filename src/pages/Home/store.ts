import { StoreSlice } from "common/store/types";
import { IStateStores } from "stores";
import { DEFAULT_DATA_SROTE } from "./constants";
import { IHomeStore } from "./type";
import { LOCAL_STORAGE_KEY } from "common/constants";

const createHomeSlice: StoreSlice<IHomeStore, IStateStores> = (set, get) => ({
  home: {
    data: { ...DEFAULT_DATA_SROTE },
    initPage: async () => {
      set((state) => {
        state.home.data.loading = true;
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => {
        state.home.data.loading = false;
        state.home.data.data = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY.VIDEOS) || "[]"
        );
      });
    },
  },
});

export default createHomeSlice;
export type { IHomeStore };
