import { IStateStores } from "stores";
import { ICommonStore, IDataCommonStore, StoreSlice } from "./types";

const DEFAULT_DATA_SROTE: IDataCommonStore = Object.freeze({
  token: "",
  email: "",
});

const createCommonSlice: StoreSlice<ICommonStore, IStateStores> = (
  set,
  get
) => ({
  data: { ...DEFAULT_DATA_SROTE },

  clearAllStore: () => {
    const state = get();

    Object.keys(state).forEach((key) => {
      const item = (state as any)[key];
      item && item.clear && typeof item.clear === "function" && item.clear();
    });
  },
});

export default createCommonSlice;
export type { ICommonStore };
