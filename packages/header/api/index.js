import { axios, urlencodePost } from "../../common/api"

const getAccount = () => {
  return urlencodePost("api/user/isLogin.do", {});
}

const logout = async () => {
  const url = "api/user/logout.do";
  const { data } = await axios.post(url);
  return data;
};

export { getAccount, logout }
