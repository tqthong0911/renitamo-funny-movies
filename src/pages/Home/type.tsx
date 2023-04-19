import { IVideo } from "common/type";

export interface IData {
  loading: boolean;
  data: IVideo[];
}

export interface IHomeStore {
  home: {
    data: IData;
    initPage: () => void;
  };
}
