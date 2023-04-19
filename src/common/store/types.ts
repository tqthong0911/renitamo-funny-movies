import { GetState } from "zustand";
import { IStateStores } from "stores";
import { ReactText } from "react";

export type StoreSlice<T extends object, E extends object = T> = (
  set: (func: (state: IStateStores) => any, options?: any) => void,
  get: GetState<E extends T ? E : E & T>
) => T;

export interface IDataCommonStore {
  token: ReactText;
  email: string;
}

export interface ICommonStore {
  data: IDataCommonStore;
  clearAllStore: () => void;
}
