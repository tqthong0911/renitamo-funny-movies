import { StoreSlice } from "common/store/types";
import { IStateStores } from "stores";
import { DEFAULT_DATA_SROTE } from "./constants";
import { IInfoAuth, IAuthStore } from "./type";
import { LOCAL_STORAGE_KEY } from "common/constants";

const createAuthSlice: StoreSlice<IAuthStore, IStateStores> = (set, get) => ({
  auth: {
    data: { ...DEFAULT_DATA_SROTE },

    logout: () => {
      set((state) => {
        state.data.token = "";
      });
    },

    login: (infoAuth) => {
      const db = JSON.parse(
        localStorage.getItem("account") || "[]"
      ) as IInfoAuth[];

      const indexInfoAuth = db.indexOf(infoAuth);

      if (indexInfoAuth < 0) {
        db.push(infoAuth);
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCOUNTS, JSON.stringify(db));
      }
      set((state) => {
        state.data.token = new Date().getTime();
        state.data.email = infoAuth.email;
      });
    },
  },
});

export default createAuthSlice;
export type { IAuthStore };
