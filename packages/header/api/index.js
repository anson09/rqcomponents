import { axios, urlencodePost } from "../../common/api";
import * as message from "./modules/message";

const getAccount = () => {
  return urlencodePost("api/user/isLogin.do", {});
};

const logout = async () => {
  const url = "api/user/logout.do";
  const { data } = await axios.get(url);
  return data;
};

const getWorksapces = async () => {
  const { data } = await axios.get("api/user/v1/workspaces");
  return data;
};

export { getAccount, logout, getWorksapces, message };
