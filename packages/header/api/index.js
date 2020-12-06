import { axios, urlencodePost } from "../../common/api/index";
import * as message from "./modules/message";

const getAccount = () => urlencodePost("api/user/isLogin.do", {});

const logout = async () => {
  const url = "api/user/logout.do";
  const { data } = await axios.get(url);
  return data;
};

const getWorksapces = async () => {
  const { data } = await axios.get("api/user/v1/workspaces");
  return data;
};

const getWorksapcesProducts = async (productName) => {
  const { data } = await axios.get("/api/user/v1/workspaces/products", {
    params: { product_name: productName },
  });
  return data;
};
export { logout, getWorksapces, message, getWorksapcesProducts, getAccount };
