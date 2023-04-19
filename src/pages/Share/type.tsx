export interface IData {
  loading: boolean;
}

export interface IShareStore {
  share: {
    data: IData;
    shareVideo: (url: string) => void;
  };
}
