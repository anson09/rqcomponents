import { getAccount as getAccountApi } from "../api/index";
import { setStorage } from "./storage";

export const getAccount = async () => {
  try {
    const { data } = await getAccountApi();
    if (data.code === 0) {
      setStorage("account", {
        isLogin: true,
        fullname: data.fullname,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
        userId: data.userId,
      });
      return data;
    }
    return undefined;
  } catch {
    return undefined;
  }
};
