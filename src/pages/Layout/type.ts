export interface IInfoAuth {
  email: string;
  password: string;
}

export interface IData {
  loading: boolean;
  data: string[];
}

export interface IAuthStore {
  auth: {
    data: IData;

    logout: () => void;
    login: (info: IInfoAuth) => void;
  };
}
