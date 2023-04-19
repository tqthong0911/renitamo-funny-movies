import { create } from "zustand";
import produce, { Draft } from "immer";
import createCommonSlice, { ICommonStore } from "common/store";
import createAuthSlice, { IAuthStore } from "pages/Layout/store";
import createHomeSlice, { IHomeStore } from "pages/Home/store";
import createShareSlice, { IShareStore } from "pages/Share/store";

export interface IStateStores
  extends ICommonStore,
    IAuthStore,
    IHomeStore,
    IShareStore {}

export const userStore = create(
  produce((set, get: () => IStateStores) => {
    const _set: any = (fn: (draft: Draft<IHomeStore>) => void) =>
      set(produce(fn));

    return {
      ...createCommonSlice(_set, get),
      ...createAuthSlice(_set, get),
      ...createHomeSlice(_set, get),
      ...createShareSlice(_set, get),
    };
  })
);

export default userStore;
